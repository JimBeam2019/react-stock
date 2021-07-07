import { gql } from '@apollo/client';

export const SEARCH_COMPANIES = gql`
  query getCompanies($title: String!) {
    getCompaniesByTitle(title: $title) {
      id
      title
    }
  }
`;

export const GET_COMPANY_STOCKS = gql`
  query getCompanyStocks($companyId: Int!) {
    getAllCompanyDailyStocks(companyId: $companyId) {
      open
      close
      high
      low
      volume
      date
    }
  }
`;
