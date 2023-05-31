const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'scriptscout_db',
  'root',
  'password',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
