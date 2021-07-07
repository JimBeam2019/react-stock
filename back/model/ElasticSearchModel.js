const { Client } = require('@elastic/elasticsearch');

require('array.prototype.flatmap').shim();
require('dotenv').config();

const logger = require('../config/logger');

/**
 *
 *
 * @class ElasticSearchModer
 */
class ElasticSearchModer {
  /**
   * Creates an instance of ElasticSearchModer.
   * @memberof ElasticSearchModer
   */
  constructor() {
    this.client = new Client({
      node: process.env.ELASTIC_URL,
      requestTimeout: 2000,
      sniffInterval: 500,
      sniffOnStart: true,
      sniffOnConnectionFault: true,
    });
  }

  /**
   *
   *
   * @param {string} index
   * @param {object} properties
   * @return {Promise}
   * @memberof ElasticSearchModer
   */
  async createIndice(index, properties) {
    const result = await this.client.indices.create(
      {
        index,
        body: { mappings: { properties } },
      },
      { ignore: [400] }
    );

    return result;
  }

  /**
   *
   *
   * @param {string} index
   * @param {array} dataset
   * @return {Record}
   * @memberof ElasticSearchModer
   */
  async bulkCreate(index, dataset) {
    const body = dataset.flatMap((doc) => [{ index: { _index: index } }, doc]);

    const { body: bulkResponse } = await this.client.bulk({
      refresh: true,
      body,
    });

    return bulkResponse;
  }

  /**
   *
   *
   * @param {string} index
   * @return {Promise}
   * @memberof ElasticSearchModer
   */
  async count(index) {
    const { body: count } = await this.client.count({ index });

    return count;
  }

  /**
   *
   *
   * @param {string} index
   * @return {boolean}
   * @memberof ElasticSearchModer
   */
  async exists(index) {
    const elasticIndex = await this.client.indices.exists({ index });
    logger.debug('Exist:', { elasticIndex });

    return elasticIndex.body;
  }

  /**
   *
   *
   * @param {string} index
   * @param {object} matchObj
   * @return {Promise}
   * @memberof ElasticSearchModer
   */
  async search(index, matchObj) {
    const result = await this.client.search({
      index,
      body: {
        query: {
          match: matchObj,
        },
      },
    });

    return result;
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof ElasticSearchModer
   */
  async clearAll() {
    this.client.indices.delete({ index: '*' }, (err, res) => {
      if (err) {
        logger.error('Clear all error:', { error: err.message });
      } else {
        logger.info('All indexes have been deleted.', { res });
      }
    });
  }
}

module.exports = ElasticSearchModer;
