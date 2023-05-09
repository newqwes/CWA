const dotenv = require('dotenv');
const { Pool, Client } = require('pg');
const { io } = require('../../config');

dotenv.config();

module.exports = {
  development: {
    dialect: process.env.PGUSER,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    omitNull: true,
  },
};

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

(async () => {
  await pool.connect();

  await client.connect();

  await client.query('LISTEN bank_update');

  client.on('notification', (msg) => {
    if (msg.channel === 'bank_update') {
      const updatedValue = parseInt(msg.payload, 10);
      console.log('Значение банка обновлено:', updatedValue);
      io.emit('bank', updatedValue);
    }
  });
})();
