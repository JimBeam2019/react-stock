const CompanyQuarterReport = require('../pg/CompanyQuarterReport');
const SeqBaseModel = require('../base/SeqBaseModel');

/**
 *
 *
 * @class CompanyQuarterReportModel
 * @extends {SeqBaseModel}
 */
class CompanyQuarterReportModel extends SeqBaseModel {
  /**
   *
   *
   * @param {number} companyId
   * @return {Promise}
   * @memberof CompanyQuarterReportModel
   */
  async getCompanyQuarterReportsByCompId(companyId) {
    try {
      const getAllCompanyQuarterReports =
        async function getAllCompanyQuarterReports(t) {
          const allCompanyQuarterReports = await CompanyQuarterReport.findAll(
            { order: [['id', 'DESC']], limit: 25, where: { companyId } },
            { transaction: t }
          );

          return allCompanyQuarterReports;
        };

      const res = await this.applyTransaction(getAllCompanyQuarterReports);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CompanyQuarterReportModel;
