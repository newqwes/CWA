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
        allowNull: false,
        unique: true,
      },
      lastDateUpdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      dataRefreshLimitPerMinute: {
        type: DataTypes.DOUBLE,
        defaultValue: 1,
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
      avatar: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
        validate: {
          isIn: {
            args: [[null, 'male', 'female']],
            msg: 'Valid values for "gender" field: male, female, or null',
          },
        },
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
