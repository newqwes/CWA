module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('bank', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    });

    // Создание триггера для обновления bank.value
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_bank_value()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'UPDATE' THEN
          IF NEW.score > OLD.score THEN
            UPDATE bank
            SET value = value - (NEW.score - OLD.score)
            WHERE id = 1;
          ELSE
            UPDATE bank
            SET value = value + (OLD.score - NEW.score)
            WHERE id = 1;
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_update_bank_value
      AFTER UPDATE ON "user"
      FOR EACH ROW
      EXECUTE FUNCTION update_bank_value();
      
      CREATE OR REPLACE FUNCTION notify_bank_update()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.id = 1 THEN
          PERFORM pg_notify('bank_update', NEW.value::text);
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    
      CREATE TRIGGER bank_update_trigger
      AFTER UPDATE ON bank
      FOR EACH ROW
      EXECUTE FUNCTION notify_bank_update();
    `);

    // Запуск транзакции
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Обновление существующих записей в таблице user
      await queryInterface.sequelize.query(`
        UPDATE "user"
        SET score = 1000 - (SELECT COALESCE(SUM(value), 0) FROM bank WHERE id = 1)
        WHERE score <> 1000;
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    // Удаление триггера
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_update_bank_value ON "user";
      DROP FUNCTION IF EXISTS update_bank_value();
    `);

    await queryInterface.dropTable('bank');
  },
};
