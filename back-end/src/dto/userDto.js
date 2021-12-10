class UserDto {
  email;

  login;

  type;

  id;

  isActivated;

  constructor(model) {
    this.email = model.email;
    this.login = model.login;
    this.type = model.type;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
