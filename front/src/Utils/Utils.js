export const getRounded = (num) => Math.round(num * 1000) / 1000;

export const convertCompStockData = (data) => {
  const candleStockData = [];
  const lineAreaData = [];

  if (data && data.getAllCompanyDailyStocks) {
    data.getAllCompanyDailyStocks.forEach(
      ({ date, open, close, high, low }) => {
        const dateMoment = date.split('-');
        const year = dateMoment[0];
        const month = dateMoment[1];
        const day = dateMoment[2];

        candleStockData.push({
          x: new Date(year, month, day),
          open,
          close,
          high,
          low,
        });

        lineAreaData.push({
          x: new Date(year, month, day),
          y: close,
        });
      }
    );
  }

  return { candleStockData, lineAreaData };
};

export const convertQuarterReportData = (data) => {
  const quarterReportData = [];

  if (data && data.getCompanyQuarterReports) {
    data.getCompanyQuarterReports.forEach(
      ({ year, quarterType, revenue, netIncome }) => {
        let newQuarterType = '';
        switch (quarterType) {
          case 'QUARTER_ONE':
            newQuarterType = 'Q1';
            break;
          case 'QUARTER_TWO':
            newQuarterType = 'Q2';
            break;
          case 'QUARTER_THREE':
            newQuarterType = 'Q3';
            break;
          case 'QUARTER_FOUR':
            newQuarterType = 'Q4';
            break;
          default:
            break;
        }
        quarterReportData.push({
          year,
          quarterType: newQuarterType,
          revenue,
          netIncome,
        });
      }
    );
  }

  return quarterReportData;
};

export const convertCompanyInfo = (data) => {
  let title = '';
  let foundedYear = '';
  let website = '';
  let employeeNum = 0;
  let headquarterAddress = '';

  if (data && data.getCompanyById) {
    title = data.getCompanyById.title;
    foundedYear = data.getCompanyById.foundedYear;
    website = data.getCompanyById.website;
    employeeNum = data.getCompanyById.employeeNum;
    headquarterAddress = data.getCompanyById.headquarterAddress;
  }

  return { title, foundedYear, website, employeeNum, headquarterAddress };
};

export const convertUserFundData = (data) =>
  data.map(({ fundType, balance }) => {
    switch (fundType) {
      case 'DOMESTIC_STOCK':
        return { x: 'Domestic', y: balance };
      case 'FOREIGN_STOCK':
        return { x: 'Foreign', y: balance };
      case 'BOND':
        return { x: 'Bond', y: balance };
      case 'SHORT_TERM_INVESTMENT':
        return { x: 'Short term', y: balance };
      case 'REAL_ESTATE':
        return { x: 'Real estate', y: balance };
      default:
        return {};
    }
  });
