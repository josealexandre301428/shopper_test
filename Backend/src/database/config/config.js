require('dotenv').config();


const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: process.env.MYSQL_DB_NAME || 'shopper',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};