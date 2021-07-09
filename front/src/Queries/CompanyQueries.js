import { gql } from '@apollo/client';

export const SEARCH_COMPANIES = gql`
  query getCompanies($title: String!) {
    getCompaniesByTitle(title: $title) {
      id
      title
      foundedYear
      website
      employeeNum
      headquarterAddress
    }
  }
`;

export const GET_COMPANY_STOCKS = gql`
  query getCompanyStocks($companyId: Int!) {
    getCompanyById(id: $companyId) {
      id
      title
      foundedYear
      website
      employeeNum
      headquarterAddress
    }

    getAllCompanyDailyStocks(companyId: $companyId) {
      open
      close
      high
      low
      volume
      date
    }

    getCompanyQuarterReports(companyId: $companyId) {
      year
      quarterType
      revenue
      netIncome
    }
  }
`;
