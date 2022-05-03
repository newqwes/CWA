import TelegraAPI from 'node-telegram-bot-api';
import { forEach, isEmpty, isFinite, round } from 'lodash';
import { get, isEqual, pick } from 'lodash/fp';

import { AGAIN_MESSAGE_OPTIONS, MESSAGE_OPTIONS, MINUTE, TEN_MINUTE } from '../constants/telegram';
import { compareResults, getResultMessage, isAuthCode, removeAuthCode } from '../utils/telegram';
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

const runNotification = async (userId, trigerPersent, chatId, oldPriceList) => {
  const orders = await orderService.getRawUserOrders(userId);

  const coinNameList = getUniqNameOrders(orders);

  const listCoin = await getGeckoCoins(coinNameList);

  const result = {};

  coinNameList.forEach(myCoinName => {
    const currency = listCoin.find(({ id }) => isEqual(id, myCoinName));

    const currentPrice = get(['current_price'], currency);

    const oldCurrency = oldPriceList.find(({ id }) => isEqual(id, myCoinName));
    const prevCurrentPrice = get(['current_price'], oldCurrency);

    if (!currentPrice || !prevCurrentPrice) return;

    const changesPricePersent = round((currentPrice * 100) / prevCurrentPrice - 100, 4);

    if (changesPricePersent > trigerPersent) {
      result[currency.name] = changesPricePersent;
    }

    if (changesPricePersent < -trigerPersent) {
      result[currency.name] = changesPricePersent;
    }
  });

  const arrResult = [];

  forEach(result, (value, key) => {
    arrResult.push(
      result[key] > 0
        ? `🔼${key}\nподнялся на ${round(value, 2)}%`
        : `🔻${key}\nупал на ${round(value, 2)}%`,
    );
  });

  if (!isEmpty(arrResult)) {
    MyBot.sendMessage(chatId, arrResult.join('\n\n'), MESSAGE_OPTIONS);
  }
};

const runTelegramBotService = async () => {
  MyBot.on(
    'message',
    async ({ text, chat: { id, first_name: firstName }, from: { id: telegramUserId } }) => {
      try {
        const userExist = await userService.findByTelegramUserId(telegramUserId);

        const textLikeNumber = Number(text);

        if (text === '/start') {
          return MyBot.sendMessage(
            id,
            `${firstName}, добро пожаловать в Coinlitics!`,
            MESSAGE_OPTIONS,
          );
        }

        if (isAuthCode(text)) {
          const user = await userService.findByKey(removeAuthCode(text), 'id');

          if (!user) {
            return MyBot.sendMessage(
              id,
              `ОШИБКА! Код авторизации не правельный! ${text}`,
              MESSAGE_OPTIONS,
            );
          }

          if (user.telegramUserId) {
            return MyBot.sendMessage(
              id,
              'Данный код авторизации уже был использован!',
              MESSAGE_OPTIONS,
            );
          }

          user.telegramUserId = telegramUserId;
          await user.save();

          return MyBot.sendMessage(id, 'Код авторизации принят успешно!', MESSAGE_OPTIONS);
        }

        if (!userExist) {
          return MyBot.sendMessage(
            id,
            `${firstName}, вы не авторизованны, отправте нам ключ авторизации с сайта: coinlitics.ru`,
            MESSAGE_OPTIONS,
          );
        }

        if (text === '🔄🔄🔄') {
          const { dataRefreshLimitPerMinute, lastDateUpdate } = pick(
            ['dataRefreshLimitPerMinute', 'lastDateUpdate'],
            userExist,
          );

          const timeLimitOver = isTimeLimitOver(dataRefreshLimitPerMinute, lastDateUpdate);
          const remainingTime = getRemainingTime(dataRefreshLimitPerMinute, lastDateUpdate);

          if (!timeLimitOver) {
            return MyBot.sendMessage(
              id,
              `Обновить можно только через: ${remainingTime} секунд`,
              MESSAGE_OPTIONS,
            );
          }

          const orders = await orderService.getRawUserOrders(userExist.id);

          const coinNameList = getUniqNameOrders(orders);

          const gridRowData = getGridRowData(
            orders,
            userExist.list,
            userExist.prevData.gridRowData,
          );

          const comparisonOrdersAndPriceList = getComparisonOrdersAndPriceList(
            orders,
            userExist.list,
          );
          const netProfitRaw = getNetProfit(comparisonOrdersAndPriceList);
          const totalInvested = getTotalInvested(orders);

          const netProfitPercent = getNetProfitPercent(netProfitRaw, totalInvested);
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
          const resultMessage = getResultMessage(result);

          return MyBot.sendMessage(id, resultMessage, MESSAGE_OPTIONS);
        }

        if (text === '⏰⏰⏰') {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;

            return MyBot.sendMessage(id, 'Оповещение остановленно!', MESSAGE_OPTIONS);
          }

          return MyBot.sendMessage(
            id,
            'Введите % изменения за рамками которого придет уведомление:',
            AGAIN_MESSAGE_OPTIONS,
          );
        }

        if (isFinite(textLikeNumber) && textLikeNumber >= 0 && textLikeNumber < 30) {
          if (timeoutId) clearTimeout(timeoutId);

          timeoutId = setInterval(
            runNotification,
            TEN_MINUTE,
            userExist.id,
            textLikeNumber,
            id,
            userExist.list,
          );

          return MyBot.sendMessage(
            id,
            `Оповещение задано на каждые ${TEN_MINUTE / MINUTE} минут при изменение в ${text}%!`,
            MESSAGE_OPTIONS,
          );
        }

        return MyBot.sendMessage(id, 'Я тебя не понимаю, попробуй еще раз!)', MESSAGE_OPTIONS);
      } catch (error) {
        return MyBot.sendMessage(id, 'Произошла какая то ошибочка!)', MESSAGE_OPTIONS);
      }
    },
  );
};

export default runTelegramBotService;
