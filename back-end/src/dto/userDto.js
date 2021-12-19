class UserDto {
  email;

  login;

  userType;

  id;

  isActivated;

  score;

  lastDateUpdate;

  dataRefreshLimitPerMinute;

  constructor(model) {
    this.email = model.email;
    this.login = model.login;
    this.userType = model.userType;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.score = Number(model.score);
    this.lastDateUpdate = model.lastDateUpdate;
    this.dataRefreshLimitPerMinute = Number(model.dataRefreshLimitPerMinute);
  }
}

export default UserDto;
