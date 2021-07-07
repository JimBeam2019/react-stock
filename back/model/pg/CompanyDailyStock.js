const { Sequelize } = require('sequelize');
const sequelize = require('../../connection/sequelize');

/**
 *
 *
 * @class CompanyDailyStock
 * @extends {Sequelize.Model}
 */
class CompanyDailyStock extends Sequelize.Model {}

CompanyDailyStock.init(
  {
    companyId: Sequelize.INTEGER,
    open: Sequelize.REAL,
    close: Sequelize.REAL,
    high: Sequelize.REAL,
    low: Sequelize.REAL,
    volume: Sequelize.INTEGER,
    date: Sequelize.DATEONLY,
  },
  { sequelize, modelName: 'company_daily_stocks' }
);

module.exports = CompanyDailyStock;
