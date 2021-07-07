const EventEmitter = require('events');

require('array.prototype.flatmap').shim();
require('dotenv').config();

const InitModel = require('../model/database/InitModel');
const CompanyModel = require('../model/database/CompanyModel');
const ElasticSearchModel = require('../model/ElasticSearchModel');
const logger = require('../config/logger');

/**
 *
 *
 * @class DbEvent
 * @extends {EventEmitter}
 */
class DbEvent extends EventEmitter {
  /**
   * Creates an instance of DbEvent.
   * @memberof DbEvent
   */
  constructor() {
    super();

    this.INIT_DATABASE = 'initDatabase';

    this.initDbEvent();
  }

  /**
   *
   *
   * @memberof DbEvent
   */
  initDbEvent() {
    this.on(this.INIT_DATABASE, async () => {
      const initModel = new InitModel();

      await initModel.initDB();

      const companyModel = new CompanyModel();
      const resCompanies = await companyModel.getCompanies();

      setTimeout(() => {
        this.initElasticSearch(resCompanies).catch((err) => {
          logger.error('Elastic Search error:', { err });
        });
      }, 12000);
    });
  }

  /**
   *
   *
   * @param {array} companies
   * @memberof DbEvent
   */
  async initElasticSearch(companies) {
    const indexName = 'companies';
    const properties = {
      id: { type: 'integer' },
      title: { type: 'text' },
    };
    const elasticSearch = new ElasticSearchModel();

    await elasticSearch.createIndice(indexName, properties);

    const bulkResponse = await elasticSearch.bulkCreate(indexName, companies);

    if (bulkResponse.errors) {
      logger.error('Bulk response error:', { bulkResponse });
    }

    const count = await elasticSearch.count(indexName);
    logger.info('Company count:', { count });

    const result = await elasticSearch.search(indexName, { title: 'Game' });
    logger.info('Search result:', { result });
  }

  /**
   *
   *
   * @return {string}
   * @memberof DbEvent
   */
  getInitDbEventName() {
    return this.INIT_DATABASE;
  }
}

module.exports = DbEvent;
