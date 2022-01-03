import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class CoinList extends Model {}

CoinList.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    name: { type: DataTypes.STRING, allowNull: false },
    list: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'coin_list',
    timestamps: false,
    underscored: true,
  },
);

export default CoinList;
