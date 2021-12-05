import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { USER_ROLES } from '../../constants';

import sequelize from '..';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      defaultValue: USER_ROLES.user,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  },
);

export default User;
