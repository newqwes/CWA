const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4(),
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
        unique: true,
      },
      lastDateUpdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      score: {
        type: DataTypes.DOUBLE,
        defaultValue: 1,
        allowNull: false,
      },
      dataRefreshLimitPerMinute: {
        type: DataTypes.DOUBLE,
        defaultValue: 2,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      list: {
        type: DataTypes.JSON,
      },
      prevData: {
        type: DataTypes.JSON,
      },
      activationHash: {
        type: DataTypes.STRING(100),
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
