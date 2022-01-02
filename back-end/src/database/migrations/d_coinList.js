const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('coin_list', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      name: { type: DataTypes.STRING, allowNull: false },
      list: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('coin_list');
  },
};
