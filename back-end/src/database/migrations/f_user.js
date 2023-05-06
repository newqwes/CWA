module.exports = {
  up: async (queryInterface, DataTypes) => {
    await Promise.all([
      queryInterface.addColumn('user', 'avatar', {
        type: DataTypes.STRING(100),
        allowNull: true,
      }),
      queryInterface.addColumn('user', 'gender', {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
        validate: {
          isIn: {
            args: [[null, 'male', 'female']],
            msg: 'Valid values for "gender" field: male, female, or null',
          },
        },
      }),
    ]);
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('user', 'avatar'),
      queryInterface.removeColumn('user', 'gender'),
    ]);
  },
};
