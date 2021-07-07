const ElasticSearchModel = require('./ElasticSearchModel');

/**
 *
 *
 * @class CompanyElasticModel
 */
class CompanyElasticModel {
  /**
   * Creates an instance of CompanyElasticModel.
   * @memberof CompanyElasticModel
   */
  constructor() {
    this.INDEX = 'companies';
  }

  /**
   *
   *
   * @param {string} title
   * @return {array}
   * @memberof CompanyElasticModel
   */
  async getCompanyByTitle(title) {
    const elasticSearch = new ElasticSearchModel();

    const { body } = await elasticSearch.search(this.INDEX, { title });
    const { hits } = body;

    return hits.hits;
  }
}

module.exports = CompanyElasticModel;
