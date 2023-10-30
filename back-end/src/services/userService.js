import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { isEmpty } from 'lodash';
import Order from '../database/models/order';
import User from '../database/models/user';
import createResponse, { makeAvatarURL } from '../utils/createResponse';
import { GENDER_OBJ } from '../constants/requestBody';
import { prepareUserList } from '../utils/user';
import ApiError from '../exceptions/apiError';
import { getGeckoCoins } from '../utils/coinGeckoClient';
import UserDto from '../dto/userDto';

class UserService {
  async findByKey(value, key) {
    if (!value) return null;
    return User.findOne({ where: { [key]: value } });
  }

  async findByTelegramUserId(telegramUserId) {
    try {
      return await User.findOne({ where: { telegramUserId }, raw: true });
    } catch (error) {
      return false;
    }
  }

  async findOrCreateByEmail(email, defaults) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults,
      });

      return { user, created };
    } catch (error) {
      createResponse(500, 'Server Error findOrCreateByEmail', error);
    }
  }

  async deleteUser(userId) {
    try {
      const isUserFound = await User.destroy({ where: { id: userId } });

      await Order.destroy({ where: { userId } });

      if (isUserFound) return createResponse(200, 'Данные успешно удалены!');

      return createResponse(404, 'Пользователь не был найден!');
    } catch (error) {
      createResponse(500, 'Server Error findOrCreateByEmail', error);
    }
  }

  async getUserList(userId) {
    try {
      const users = await User.findAll({ where: { id: { [Op.ne]: userId } } });
      const nonSensitiveUserData = prepareUserList(users);

      return createResponse(
        200,
        'Данные успешно получены!',
        nonSensitiveUserData
      );
    } catch (error) {
      createResponse(500, 'Server Error getUserList', error);
    }
  }

  async getAvailableAvatars(gender) {
    try {
      const users = await User.findAll({ raw: true });
      const existAvatars = users
        .map((user) => user.avatar)
        .filter((avatar) => avatar !== null);

      const files = fs.readdirSync(
        `${process.env.PROJECT_FULL_FOLDER_PATH}/${process.env.PUBLIC_FOLDER_NAME}/${process.env.AVATAR_FOLDER}`
      );

      let fileNames = files.map((file) => path.basename(file));

      if (gender === GENDER_OBJ.male) {
        fileNames = fileNames.filter((fileName) => !fileName.startsWith('m'));
      } else if (gender === GENDER_OBJ.female) {
        fileNames = fileNames.filter((fileName) => !fileName.startsWith('w'));
      }

      const filteredFileNames = fileNames.filter(
        (fileName) => !existAvatars.includes(fileName)
      );

      if (isEmpty(filteredFileNames)) {
        return createResponse(404, 'Файлы не найдены');
      }

      const avatarURLs = filteredFileNames.map(makeAvatarURL);

      return createResponse(200, 'Данные успешно получены!', avatarURLs);
    } catch (error) {
      return createResponse(500, 'Server Error getAvailableAvatars', error);
    }
  }

  async getUserPlaceList(userId) {
    try {
      const user = await this.findByKey(userId, 'id');

      if (!user) {
        throw ApiError.BadRequest('Пользователь с таким ID не существует');
      }

      const { placeList } = new UserDto(user);

      return createResponse(
        200,
        'Данные успешно получены!',
        placeList
      );
    } catch (error) {
      createResponse(500, 'Server Error getUserList', error);
    }
  }

  async setUserPlace(userId, place) {
    try {
      const user = await this.findByKey(userId, 'id');

      if (!user) {
        throw ApiError.BadRequest('Пользователь с таким ID не существует');
      }

      if (user.placeList) {
        user.placeList = [...user.placeList, place];
      } else {
        user.placeList = [place];
      }

      await user.save();

      const { placeList } = new UserDto(user);

      return createResponse(
        200,
        'Данные успешно записаны!',
        placeList
      );
    } catch (error) {
      createResponse(500, 'Server Error getUserList', error);
    }
  }
}

export default new UserService();
