import { DataTypes, Model } from 'sequelize';

import sequelize from '..';

class Bank extends Model {}

Bank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: 'bank',
    timestamps: false,
  },
);

export default Bank;
