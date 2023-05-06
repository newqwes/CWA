import { makeAvatarURL } from '../utils/createResponse';

class UserDto {
  email;

  login;

  telegramUserId;

  userType;

  id;

  isActivated;

  score;

  lastDateUpdate;

  list;

  prevData;

  dataRefreshLimitPerMinute;

  avatar;

  gender;

  constructor(model) {
    this.email = model.email;
    this.login = model.login;
    this.telegramUserId = model.telegramUserId;
    this.userType = model.userType;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.score = Number(model.score);
    this.lastDateUpdate = model.lastDateUpdate;
    this.list = model.list;
    this.prevData = model.prevData;
    this.dataRefreshLimitPerMinute = Number(model.dataRefreshLimitPerMinute);
    this.avatarURL = makeAvatarURL(model.avatar);
    this.gender = model.gender;
  }
}

export default UserDto;
