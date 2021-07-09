const CompanyQuarterReportModel = require('../../model/database/CompanyQuarterReportModel');
const logger = require('../../config/logger');

/**
 *
 *
 * @param {*} _root
 * @param {object} args
 * @return {array}
 */
const getCompanyQuarterReports = async (_root, args) => {
  try {
    const { companyId } = args;

    const companyQuarterReportModel = new CompanyQuarterReportModel();
    const resCompQuarterReports =
      await companyQuarterReportModel.getCompanyQuarterReportsByCompId(
        companyId
      );

    return resCompQuarterReports;
  } catch (e) {
    logger.error(e);

    return [];
  }
};

module.exports = {
  getCompanyQuarterReports,
};
