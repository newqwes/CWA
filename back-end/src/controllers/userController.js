import { chunk, pick } from 'lodash/fp';
import { round } from 'lodash';
import ApiError from '../exceptions/apiError';
import { getGender, getUserId } from '../utils/user';
import userService from '../services/userService';
import { compareResults, getResultMessage, removeAuthCode } from '../utils/telegram';
import UserDto from '../dto/userDto';
import { getRemainingTime, isTimeLimitOver } from '../utils/toMinute';
import { MESSAGE_OPTIONS } from '../constants/telegram';
import orderService from '../services/orderService';
import {
  getComparisonOrdersAndPriceList,
  getGridRowData,
  getNetProfit, getNetProfitPercent,
  getTotalInvested,
  getUniqNameOrders, getWalletState
} from '../utils/extractData';
import refreshService from '../services/refreshService';

export const deleteUser = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return next(ApiError.BadRequest('Пользователь не найден'));
    }

    const { status, data } = await userService.deleteUser(userId);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};
export const getUserList = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return next(ApiError.BadRequest('Вы не были найдены в нашей базе данных'));
    }

    const { status, data } = await userService.getUserList(userId);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};

export const getAvailableAvatars = async (req, res, next) => {
  try {
    const gender = getGender(req);

    const { status, data } = await userService.getAvailableAvatars(gender);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};

export const getUserPlaceList = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return next(ApiError.BadRequest('Вы не были найдены в нашей базе данных'));
    }

    const { status, data } = await userService.getUserPlaceList(userId);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};
export const setUserPlace = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { place } = pick(['place'], req.body);

    if (!userId || !place) {
      return next(ApiError.BadRequest('Пользователь не найден'));
    }

    const { status, data } = await userService.setUserPlace(userId, place);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};
export const getUserMainData = async (req, res, next) => {
  try {
    const { telegramKey } = pick(['telegramKey'], req.params);

    const user = await userService.findByKey(removeAuthCode(telegramKey), 'id');

    const userDto = new UserDto(user);

    // const { dataRefreshLimitPerMinute, lastDateUpdate } = pick(
    //   ['dataRefreshLimitPerMinute', 'lastDateUpdate'],
    //   userDto
    // );

    // const timeLimitOver = isTimeLimitOver(dataRefreshLimitPerMinute, lastDateUpdate);
    // const remainingTime = getRemainingTime(dataRefreshLimitPerMinute, lastDateUpdate);

    // if (timeLimitOver) {
    //   return res.send(`Обновить можно только через: ${remainingTime} секунд`);
    // }

    return res.send('В общей сложности вы вложили 888 долларов и в данный момент ваш криптопортфель составляет 810.54 долларов. Ваш общий убыток составляет -8.72% или -0.05% в денежном выражении. 📉');

    const orders = await orderService.getRawUserOrders(userDto.id);

    const coinNameList = getUniqNameOrders(orders);

    const gridRowData = getGridRowData(
      orders,
      userDto.list,
      userDto.prevData.gridRowData
    );

    const comparisonOrdersAndPriceList = getComparisonOrdersAndPriceList(
      orders,
      userDto.list
    );
    const netProfitRaw = getNetProfit(comparisonOrdersAndPriceList);
    const totalInvested = getTotalInvested(orders);

    const netProfitPercent = getNetProfitPercent(netProfitRaw, totalInvested);
    const walletState = getWalletState(netProfitRaw, totalInvested);

    const prevData = {
      netProfit: netProfitPercent,
      walletState,
      gridRowData
    };

    const refreshData = await refreshService.refresh({
      userId: userDto.id,
      prevData,
      coinList: coinNameList
    });

    const result = compareResults(refreshData);
    const { arrOfMessages, sumMessage } = getResultMessage(result);
    console.log(arrOfMessages.join('\n'));
    console.log(sumMessage);

    return res.send(sumMessage);
  } catch (e) {
    next(e);
  }
};
