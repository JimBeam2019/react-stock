const { Sequelize } = require("sequelize");
const sequelize = require("../../connection/sequelize");

/**
 *
 *
 * @class CompanyQuarterReport
 * @extends {Sequelize.Model}
 */
class CompanyQuarterReport extends Sequelize.Model {}

CompanyQuarterReport.init(
  {
    companyId: Sequelize.INTEGER,
    year: Sequelize.INTEGER,
    quarterType: {
      type: Sequelize.ENUM,
      values: ["QUARTER_ONE", "QUARTER_TWO", "QUARTER_THREE", "QUARTER_FOUR"],
    },
    revenue: Sequelize.REAL,
    netIncome: Sequelize.REAL,
  },
  { sequelize, modelName: "company_quarter_reports" }
);

module.exports = CompanyQuarterReport;
