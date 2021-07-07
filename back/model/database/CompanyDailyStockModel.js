const CompanyDailyStock = require('../pg/CompanyDailyStock');
const SeqBaseModel = require('../base/SeqBaseModel');

/**
 *
 *
 * @class CompanyDailyStockModel
 * @extends {SeqBaseModel}
 */
class CompanyDailyStockModel extends SeqBaseModel {
  /**
   *
   *
   * @param {number} companyId
   * @return {Promise}
   * @memberof CompanyDailyStockModel
   */
  async getCompanyDailyStocksByCompId(companyId) {
    try {
      const getAllCompDailyStocks = async function getAllCompDailyStocks(t) {
        const allCompanyDailyStocks = await CompanyDailyStock.findAll(
          { order: [['id', 'DESC']], limit: 25, where: { companyId } },
          { transaction: t }
        );

        return allCompanyDailyStocks;
      };

      const res = await this.applyTransaction(getAllCompDailyStocks);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   *
   * @param {array} stocks
   * @return {Promise}
   * @memberof CompanyDailyStockModel
   */
  async insertCompanyDailyStocks(stocks) {
    try {
      const resCompanyStocks = await CompanyDailyStock.bulkCreate(stocks);

      return resCompanyStocks;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CompanyDailyStockModel;
