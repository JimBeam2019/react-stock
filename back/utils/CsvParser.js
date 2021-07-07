const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

class CsvParser {
  /**
   *
   *
   * @param {string} filename
   * @return {string}
   * @memberof CsvParser
   */
  async getRawCsv(filename) {
    const dirPath = path.join(process.cwd(), '/file');

    return new Promise((resolve) => {
      resolve(fs.readFileSync(`${dirPath}/${filename}`));
    });
  }

  /**
   *
   *
   * @param {string} filename
   * @return {array}
   * @memberof CsvParser
   */
  async getObjCsv(filename) {
    const fileBuf = await this.getRawCsv(filename);

    const records = parse(fileBuf, { columns: true, trim: true });

    return records;
  }
}

module.exports = CsvParser;
