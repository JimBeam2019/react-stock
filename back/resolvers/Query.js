const { merge } = require('lodash');

const CurrencyResolvers = require('./query/CurrencyResolvers');
const AccountResolvers = require('./query/AccoutResolvers');
const CompanyResolvers = require('./query/CompanyResolvers');
const CompanyStockResolvers = require('./query/CompanyStockResolvers');
const CompanyQuarterReportResolver = require('./query/CompanyQuarterReportResolver');

const Query = merge(
  CurrencyResolvers,
  AccountResolvers,
  CompanyResolvers,
  CompanyStockResolvers,
  CompanyQuarterReportResolver
);

module.exports = Query;
