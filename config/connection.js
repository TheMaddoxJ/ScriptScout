const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'scriptscout_db',
  'root',
  'Mahee2017@',
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
