import TelegraAPI from 'node-telegram-bot-api';
import { forEach, isEmpty, isFinite, round } from 'lodash';
import { chunk, get, isEqual, pick } from 'lodash/fp';
import cron from 'node-cron';

import {
  AGAIN_MESSAGE_OPTIONS,
  DAILY_UPDATES_BTN,
  MESSAGE_OPTIONS,
  MINUTE,
  NOTIFY_BUY_SELL_BTN,
  NOTIFY_CHANGES_BTN,
  REFRESH_BTN,
  TEN_MINUTE,
} from '../constants/telegram';
import {
  compareResults,
  getResultMessage,
  isAuthCode,
  removeAuthCode,
} from '../utils/telegram';
import userService from './userService';
import orderService from './orderService';

import {
  getComparisonOrdersAndPriceList,
  getGridRowData,
  getNetProfit,
  getNetProfitPercent,
  getTotalInvested,
  getUniqNameOrders,
  getWalletState,
} from '../utils/extractData';
import refreshService from './refreshService';
import { getRemainingTime, isTimeLimitOver } from '../utils/toMinute';
import { getGeckoCoins } from '../utils/coinGeckoClient';

const MyBot = new TelegraAPI(process.env.BOT_TOKEN, { polling: true });

let timeoutId = null;
let remainderTask = null;
let buySellTask = null;

const runNotification = async (
  userId,
  triggerPercent,
  chatId,
  oldPriceList
) => {
  const orders = await orderService.getRawUserOrders(userId);

  const coinNameList = getUniqNameOrders(orders);

  const listCoin = await getGeckoCoins(coinNameList);

  const result = {};

  coinNameList.forEach((myCoinName) => {
    const currency = listCoin.find(({ id }) => isEqual(id, myCoinName));

    const currentPrice = get(['current_price'], currency);

    const oldCurrency = oldPriceList.find(({ id }) => isEqual(id, myCoinName));
    const prevCurrentPrice = get(['current_price'], oldCurrency);

    if (!currentPrice || !prevCurrentPrice) return;

    const changesPricePercent = round(
      (currentPrice * 100) / prevCurrentPrice - 100,
      4
    );

    if (changesPricePercent > triggerPercent) {
      result[currency.name] = changesPricePercent;
    }

    if (changesPricePercent < -triggerPercent) {
      result[currency.name] = changesPricePercent;
    }
  });

  const arrResult = [];

  forEach(result, (value, key) => {
    arrResult.push(
      result[key] > 0
        ? `🔼${key}\nподнялся на ${round(value, 2)}%`
        : `🔻${key}\nупал на ${round(value, 2)}%`
    );
  });

  if (!isEmpty(arrResult)) {
    await MyBot.sendMessage(chatId, arrResult.join('\n\n'), MESSAGE_OPTIONS);
  }
};

const runTelegramBotService = async () => {
  MyBot.on(
    'message',
    async ({
      text,
      chat: { id, first_name: firstName },
      from: { id: telegramUserId },
    }) => {
      try {
        const userExist = await userService.findByTelegramUserId(
          telegramUserId
        );

        const textLikeNumber = Number(text);

        if (text === '/start') {
          return MyBot.sendMessage(
            id,
            `${firstName}, добро пожаловать в Coinlitics!`,
            MESSAGE_OPTIONS
          );
        }

        if (isAuthCode(text)) {
          const user = await userService.findByKey(removeAuthCode(text), 'id');

          if (!user) {
            return MyBot.sendMessage(
              id,
              `ОШИБКА! Код авторизации не правельный! ${text}`,
              MESSAGE_OPTIONS
            );
          }

          if (user.telegramUserId) {
            return MyBot.sendMessage(
              id,
              'Данный код авторизации уже был использован!',
              MESSAGE_OPTIONS
            );
          }

          user.telegramUserId = telegramUserId;
          await user.save();

          return MyBot.sendMessage(
            id,
            'Код авторизации принят успешно!',
            MESSAGE_OPTIONS
          );
        }

        if (!userExist) {
          return MyBot.sendMessage(
            id,
            `${firstName}, вы не авторизованны, отправте нам ключ авторизации с сайта: coinlitics.space`,
            MESSAGE_OPTIONS
          );
        }

        if (text === REFRESH_BTN) {
          const { dataRefreshLimitPerMinute, lastDateUpdate } = pick(
            ['dataRefreshLimitPerMinute', 'lastDateUpdate'],
            userExist
          );

          const timeLimitOver = isTimeLimitOver(
            dataRefreshLimitPerMinute,
            lastDateUpdate
          );
          const remainingTime = getRemainingTime(
            dataRefreshLimitPerMinute,
            lastDateUpdate
          );

          if (!timeLimitOver) {
            return MyBot.sendMessage(
              id,
              `Обновить можно только через: ${remainingTime} секунд`,
              MESSAGE_OPTIONS
            );
          }

          const orders = await orderService.getRawUserOrders(userExist.id);

          const coinNameList = getUniqNameOrders(orders);

          const gridRowData = getGridRowData(
            orders,
            userExist.list,
            userExist.prevData.gridRowData
          );

          const comparisonOrdersAndPriceList = getComparisonOrdersAndPriceList(
            orders,
            userExist.list
          );
          const netProfitRaw = getNetProfit(comparisonOrdersAndPriceList);
          const totalInvested = getTotalInvested(orders);

          const netProfitPercent = getNetProfitPercent(
            netProfitRaw,
            totalInvested
          );
          const walletState = getWalletState(netProfitRaw, totalInvested);

          const prevData = {
            netProfit: netProfitPercent,
            walletState,
            gridRowData,
          };

          const refreshData = await refreshService.refresh({
            userId: userExist.id,
            prevData,
            coinList: coinNameList,
          });

          const result = compareResults(refreshData);
          const { arrOfMessages, sumMessage, overThanLimit } =
            getResultMessage(result);

          if (overThanLimit) {
            const [mes1, mes2] = chunk(
              round(arrOfMessages.length / 2),
              arrOfMessages
            );

            await MyBot.sendMessage(id, mes1.join('\n'), MESSAGE_OPTIONS);
            setTimeout(async () => {
              await MyBot.sendMessage(
                id,
                `${mes2.join('\n')}${sumMessage}`,
                MESSAGE_OPTIONS
              );
            }, 500);

            return;
          }
          return MyBot.sendMessage(
            id,
            `${arrOfMessages.join('\n')}${sumMessage}`,
            MESSAGE_OPTIONS
          );
        }

        if (text === NOTIFY_CHANGES_BTN) {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;

            return MyBot.sendMessage(
              id,
              'Оповещение остановленно!',
              MESSAGE_OPTIONS
            );
          }

          return MyBot.sendMessage(
            id,
            'Введите % изменения за рамками которого придет уведомление:',
            AGAIN_MESSAGE_OPTIONS
          );
        }

        if (text === DAILY_UPDATES_BTN) {
          if (remainderTask) {
            remainderTask.stop();
            remainderTask = null;
            MyBot.sendMessage(
              id,
              'Изменения за день отключены!',
              MESSAGE_OPTIONS
            );
          } else {
            remainderTask = cron.schedule(
              '0 19 * * *',
              async () => {
                const orders = await orderService.getRawUserOrders(
                  userExist.id
                );
                const coinNameList = getUniqNameOrders(orders);
                const gridRowData = getGridRowData(
                  orders,
                  userExist.list,
                  userExist.prevData.gridRowData
                );
                const comparisonOrdersAndPriceList =
                  getComparisonOrdersAndPriceList(orders, userExist.list);
                const netProfitRaw = getNetProfit(comparisonOrdersAndPriceList);
                const totalInvested = getTotalInvested(orders);
                const netProfitPercent = getNetProfitPercent(
                  netProfitRaw,
                  totalInvested
                );
                const oldWalletState = getWalletState(
                  netProfitRaw,
                  totalInvested
                );
                const prevData = {
                  netProfit: netProfitPercent,
                  walletState: oldWalletState,
                  gridRowData,
                };
                const refreshData = await refreshService.refresh({
                  userId: userExist.id,
                  prevData,
                  coinList: coinNameList,
                });
                const { diffWalletState, walletState, diffNetProfit } =
                  compareResults(refreshData);
                await MyBot.sendMessage(
                  id,
                  `Было: ${round(oldWalletState, 2)}$\nCтало: ${round(
                    walletState,
                    2
                  )}$\nРазница: ${round(diffWalletState, 2)}$(${round(
                    diffNetProfit,
                    2
                  )}%)`,
                  MESSAGE_OPTIONS
                );
              },
              { timezone: 'Europe/Minsk' }
            );

            await MyBot.sendMessage(
              id,
              'Изменения за день включены!',
              MESSAGE_OPTIONS
            );
          }

          return;
        }

        if (text === NOTIFY_BUY_SELL_BTN) {
          if (buySellTask) {
            buySellTask.stop();
            buySellTask = null;
            MyBot.sendMessage(
              id,
              'Проверка на покупку и продажу отключены!',
              MESSAGE_OPTIONS
            );
          } else {
            buySellTask = cron.schedule(
              '*/30 * * * *',
              async () => {
                const notifyBuySellMessages = [];

                const orders = await orderService.getRawUserOrders(
                  userExist.id
                );

                //   'name',
                //   'price',
                //   'count',
                //   'date',
                //   'id',
                //   'place',
                //   'note',
                //   'priceToSell',
                //   'priceToBuy',
                const ordersWithBuyAndSellPrice = orders.filter(
                  (order) => order.priceToSell || order.priceToBuy
                );

                const coinNameList = getUniqNameOrders(
                  ordersWithBuyAndSellPrice
                );

                // "id": "bitcoin",
                // "current_price": 51700,
                const geckoCoins = await getGeckoCoins(coinNameList);
                if (!geckoCoins || !geckoCoins[0]) return;

                geckoCoins.forEach((geckoCoin) => {
                  const resultOrder = ordersWithBuyAndSellPrice.find(
                    (myOrder) => myOrder.name === geckoCoin.id
                  );

                  if (!resultOrder) return;

                  const actualPrice = get(['current_price'], geckoCoin);

                  if (
                    resultOrder.priceToSell &&
                    resultOrder.priceToSell <= actualPrice
                  ) {
                    notifyBuySellMessages.push(
                      `📈 Продай ${geckoCoin.name}, эта монета уже по ${actualPrice}, а ты хотел продать по ${resultOrder.priceToSell};`
                    );
                  }
                  if (
                    resultOrder.priceToBuy &&
                    resultOrder.priceToBuy >= actualPrice
                  ) {
                    notifyBuySellMessages.push(
                      `📉 Покупай ${geckoCoin.name}, эта монета уже по ${actualPrice}, а ты хотел купить по ${resultOrder.priceToBuy};`
                    );
                  }
                });

                await MyBot.sendMessage(
                  id,
                  notifyBuySellMessages.join('\n\n'),
                  MESSAGE_OPTIONS
                );
              },
              { timezone: 'Europe/Minsk' }
            );

            await MyBot.sendMessage(
              id,
              'Проверка на покупку и продажу включены!',
              MESSAGE_OPTIONS
            );
          }

          return;
        }

        if (isFinite(textLikeNumber) && textLikeNumber > 0) {
          if (timeoutId) clearTimeout(timeoutId);

          timeoutId = setInterval(
            runNotification,
            TEN_MINUTE,
            userExist.id,
            textLikeNumber,
            id,
            userExist.list
          );

          return MyBot.sendMessage(
            id,
            `Оповещение задано на каждые ${
              TEN_MINUTE / MINUTE
            } минут при изменение в ${text}%!`,
            MESSAGE_OPTIONS
          );
        }

        return MyBot.sendMessage(
          id,
          'Я тебя не понимаю, попробуй еще раз!)',
          MESSAGE_OPTIONS
        );
      } catch (error) {
        return MyBot.sendMessage(
          id,
          `Произошла какая то ошибочка!) ${error}`,
          MESSAGE_OPTIONS
        );
      }
    }
  );
};

export default runTelegramBotService;
