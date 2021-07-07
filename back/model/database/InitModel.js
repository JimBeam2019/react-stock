const fs = require('fs');
const path = require('path');

const SeqBaseModel = require('../base/SeqBaseModel');

/**
 *
 *
 * @class InitModel
 * @extends {SeqBaseModel}
 */
class InitModel extends SeqBaseModel {
  /**
   *
   *
   * @return {Promise}
   * @memberof InitModel
   */
  async initDB() {
    const dirPath = path.join(process.cwd(), '/db');

    const query = fs.readFileSync(`${dirPath}/init.sql`);

    await this.runQuery(query.toString());
  }
}

module.exports = InitModel;
