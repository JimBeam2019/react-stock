const { Sequelize } = require('sequelize');
const sequelize = require('../../connection/sequelize');

/**
 *
 *
 * @class Company
 * @extends {Sequelize.Model}
 */
class Company extends Sequelize.Model {}

Company.init(
  {
    title: Sequelize.STRING,
    foundedYear: Sequelize.INTEGER,
    website: Sequelize.STRING,
    employeeNum: Sequelize.INTEGER,
    headquarterAddress: Sequelize.STRING,
  },
  { sequelize, modelName: 'companies' }
);

module.exports = Company;
