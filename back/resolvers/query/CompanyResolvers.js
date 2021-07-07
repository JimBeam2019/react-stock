/* eslint-disable no-unused-vars */
const CompanyModel = require('../../model/database/CompanyModel');
const CompanyElasticModel = require('../../model/CompanyElasticModel');
const logger = require('../../config/logger');

/**
 *
 *
 * @param {*} _root
 * @return {array}
 */
const getAllCompanies = async (_root) => {
  try {
    const companyModel = new CompanyModel();
    const resCompanies = await companyModel.getCompanies();

    return resCompanies;
  } catch (e) {
    logger.error(e);

    return [];
  }
};

/**
 *
 *
 * @param {*} _root
 * @param {object} args
 * @return {object}
 */
const getCompanyByTitle = async (_root, args) => {
  try {
    const { title } = args;

    const companyModel = new CompanyModel();
    const resCompany = await companyModel.getCompanyByTitle(title);

    return resCompany;
  } catch (e) {
    logger.error(e);

    return [];
  }
};

/**
 *
 *
 * @param {*} _root
 * @param {object} args
 * @return {array}
 */
const getCompaniesByTitle = async (_root, args) => {
  try {
    const { title } = args;

    const companyElasticModel = new CompanyElasticModel();
    const resCompanies = await companyElasticModel.getCompanyByTitle(title);

    logger.verbose('Companies >>>> ', { resCompanies });
    const companySet = new Set();
    resCompanies.forEach((company) => {
      const { _source } = company;

      if (!companySet.has(_source)) {
        companySet.add(_source);
      }
    });

    return [...companySet];
  } catch (e) {
    logger.error(e);

    return [];
  }
};

module.exports = {
  getAllCompanies,
  getCompanyByTitle,
  getCompaniesByTitle,
};
