const { Op } = require('sequelize');

const Company = require('../pg/Company');
const SeqBaseModel = require('../base/SeqBaseModel');

/**
 *
 *
 * @class CompanyModel
 * @extends {SeqBaseModel}
 */
class CompanyModel extends SeqBaseModel {
  /**
   *
   *
   * @return {Promise}
   * @memberof CompanyModel
   */
  async getCompanies() {
    try {
      const getAllCompanies = async function getAllCompanies(t) {
        const allCompanies = await Company.findAll(
          { attributes: ['id', 'title'], limit: 3 },
          { transaction: t }
        );

        return allCompanies;
      };

      const res = await this.applyTransaction(getAllCompanies);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   *
   * @param {string} title
   * @return {Promise}
   * @memberof CompanyModel
   */
  async getCompanyByTitle(title) {
    try {
      const getCompany = async function getCompany(t) {
        const company = await Company.findOne(
          { where: { title: { [Op.like]: `%${title}%` } } },
          { transaction: t }
        );

        return company;
      };

      const res = await this.applyTransaction(getCompany);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   *
   * @param {number} id
   * @return {Promise}
   * @memberof CompanyModel
   */
  async getCompanyById(id) {
    try {
      const getCompany = async function getCompany(t) {
        const company = await Company.findOne(
          { where: { id } },
          { transaction: t }
        );

        return company;
      };

      const res = await this.applyTransaction(getCompany);

      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CompanyModel;
