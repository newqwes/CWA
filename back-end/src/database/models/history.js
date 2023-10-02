import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '..';

class History extends Model {}

History.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastModified: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    priceAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'history',
    timestamps: false,
    underscored: true,
  },
);

export default History;
