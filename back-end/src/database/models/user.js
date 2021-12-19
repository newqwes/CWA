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
      unique: true,
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
      unique: true,
      allowNull: false,
    },
    lastDateUpdate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dataRefreshLimitPerMinute: {
      type: DataTypes.DOUBLE,
      defaultValue: 1,
      allowNull: false,
    },
    score: {
      type: DataTypes.DOUBLE,
      defaultValue: 10,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING(50),
      defaultValue: USER_ROLES.user,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activationHash: {
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  },
);

export default User;
