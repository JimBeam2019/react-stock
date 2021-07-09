import { gql } from '@apollo/client';

export const GET_RATES = gql`
  query getRate($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;
