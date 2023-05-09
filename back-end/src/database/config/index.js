const dotenv = require('dotenv');

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
