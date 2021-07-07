const sequelize = require('../../connection/sequelize');

/**
 *
 *
 * @class SeqBaseModel
 */
class SeqBaseModel {
  /**
   *
   *
   * @param {Function} func
   * @return {Promise}
   * @memberof SeqBaseModel
   */
  async applyTransaction(func) {
    return new Promise((resolve) => {
      const result = sequelize.transaction(async (t) => {
        const res = await func(t);

        return res;
      });

      resolve(result);
    });
  }

  /**
   *
   *
   * @param {string} query
   * @return {Promise}
   * @memberof SeqBaseModel
   */
  runQuery(query) {
    return sequelize
      .transaction((t) => {
        return sequelize.query(query, { transaction: t });
      })
      .catch((err) => {
        throw err;
      });
  }

  /**
   *
   *
   * @param {string} query
   * @return {Promise}
   * @memberof SeqBaseModel
   */
  qSelect(query) {
    return sequelize
      .transaction((t) => {
        return sequelize.query(query, {
          transaction: t,
          type: sequelize.QueryTypes.SELECT,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  /**
   *
   *
   * @param {string} query
   * @param {array} replacements
   * @return {Promise}
   * @memberof SeqBaseModel
   */
  qSelectWithReplacements(query, replacements) {
    return sequelize
      .transaction((t) => {
        return sequelize.query(query, {
          transaction: t,
          replacements,
          type: sequelize.QueryTypes.SELECT,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = SeqBaseModel;
