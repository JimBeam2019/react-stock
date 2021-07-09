import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query getUserInfo {
    getUserAccount {
      id
      userName
      balance
    }

    getUserFunds {
      userId
      fundType
      balance
    }
  }
`;
