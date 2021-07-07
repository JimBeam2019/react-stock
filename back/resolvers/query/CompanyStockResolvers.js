/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');

const CompanyDailyStockModel = require('../../model/database/CompanyDailyStockModel');
const CsvParser = require('../../utils/CsvParser');
const logger = require('../../config/logger');

/**
 *
 *
 * @param {*} _root
 * @return {array}
 */
const getAllCompanyDailyStocks = async (_root, args) => {
  try {
    const { companyId } = args;
    const companyDailyStockModel = new CompanyDailyStockModel();
    const resCompanyDailyStocks =
      await companyDailyStockModel.getCompanyDailyStocksByCompId(companyId);

    return resCompanyDailyStocks;
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
const bulkCreateCompanyDailyStocks = async (_root, args) => {
  try {
    const csvParser = new CsvParser();
    const resCsvParser1 = await csvParser.getObjCsv('1.csv');
    const resCsvParser2 = await csvParser.getObjCsv('2.csv');
    const resCsvParser3 = await csvParser.getObjCsv('3.csv');

    resCsvParser1.forEach((stockData) => {
      stockData.companyId = 1;
      return stockData;
    });

    resCsvParser2.forEach((stockData) => {
      stockData.companyId = 2;
      return stockData;
    });

    resCsvParser3.forEach((stockData) => {
      stockData.companyId = 3;
      return stockData;
    });

    resCsvParser1.push(...resCsvParser2);
    resCsvParser1.push(...resCsvParser3);

    // const companyDailyStockModel = new CompanyDailyStockModel();
    // const resCompanyStocks =
    //   await companyDailyStockModel.insertCompanyDailyStocks(resCsvParser);

    // logger.debug("Company stocks: ", { resCompanyStocks });

    let newCompStocks = '';
    resCsvParser1.forEach((compStock) => {
      let strStock = '(\n';
      strStock += `\t${compStock.companyId},\n`;
      strStock += `\t${compStock.open},\n`;
      strStock += `\t${compStock.close},\n`;
      strStock += `\t${compStock.high},\n`;
      strStock += `\t${compStock.low},\n`;
      strStock += `\t${compStock.volume},\n`;
      strStock += `\t'${compStock.date}'\n`;
      strStock += '), ';

      newCompStocks += strStock;
    });

    const dirPath = path.join(process.cwd(), '/file');
    const resWriteFile = fs.writeFileSync(`${dirPath}/1.json`, newCompStocks);

    return resCsvParser1;
  } catch (e) {
    logger.error(e);

    return [];
  }
};

module.exports = {
  getAllCompanyDailyStocks,
  bulkCreateCompanyDailyStocks,
};
