const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('history', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
      },
      user_id: {
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
        defaultValue: DataTypes.NOW,
      },
      last_modified: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      price_amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('history');
  },
};
