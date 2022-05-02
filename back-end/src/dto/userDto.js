class UserDto {
  email;

  login;

  telegramUserName;

  userType;

  id;

  isActivated;

  score;

  lastDateUpdate;

  list;

  prevData;

  dataRefreshLimitPerMinute;

  constructor(model) {
    this.email = model.email;
    this.login = model.login;
    this.telegramUserName = model.telegramUserName;
    this.userType = model.userType;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.score = Number(model.score);
    this.lastDateUpdate = model.lastDateUpdate;
    this.list = model.list;
    this.prevData = model.prevData;
    this.dataRefreshLimitPerMinute = Number(model.dataRefreshLimitPerMinute);
  }
}

export default UserDto;
