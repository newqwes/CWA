import { DataTypes, Model } from 'sequelize';
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
    telegramUserId: {
      type: DataTypes.DOUBLE,
      allowNull: true,
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
    list: {
      type: DataTypes.JSON,
    },
    prevData: {
      type: DataTypes.JSON,
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
      defaultValue: 1,
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
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    level: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
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
