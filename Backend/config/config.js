require('dotenv').config();


const options = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: process.env.DB_DATABASE || 'shopper',
  username: process.env.DB_USER || 'jose',
  password: process.env.DB_PASSWORD || 'jose',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = options;