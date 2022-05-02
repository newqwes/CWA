import TelegraAPI from 'node-telegram-bot-api';
import { map, find } from 'lodash/fp';
import { MESSAGE_OPTIONS } from '../constants/telegram';
import { isAuthCode, removeAuthCode } from '../utils/telegram';
import userService from './userService';
import Order from '../database/models/order';
import { getGeckoCoins } from '../utils/coinGeckoClient';

const MyBot = new TelegraAPI(process.env.BOT_TOKEN, { polling: true });

const runTelegramBotService = async () => {
  MyBot.on('message', async ({ text, chat: { id, username, first_name: firstName } }) => {
    try {
      const userExist = await userService.findByKey(username, 'telegramUserName');

      if (userExist && text === '🔄🔄🔄') {
        const orders = await Order.findAll({
          where: { userId: userExist.id },
          attributes: ['name', 'price', 'count'],
          raw: true,
        });

        const coinNameList = map(({ name }) => name, orders);

        const geckoCoins = await getGeckoCoins(coinNameList);

        console.log(orders);

        // name, current_price
        const test = map(geckoCoin => {
          const order = find(['name', geckoCoin.id], orders);

          const diffPrice = geckoCoin.current_price - order.price;

          return `${geckoCoin.name}: ${diffPrice}$`;
        }, geckoCoins);

        return MyBot.sendMessage(id, test.join('\n'), MESSAGE_OPTIONS);
      }

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

        user.telegramUserName = username;
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

      return MyBot.sendMessage(id, 'Я тебя не понимаю, попробуй еще раз!)', MESSAGE_OPTIONS);
    } catch (error) {
      return MyBot.sendMessage(id, 'Произошла какая то ошибочка!)', MESSAGE_OPTIONS);
    }
  });
};

export default runTelegramBotService;
