import React from 'react';
import { NetworkStatus, useLazyQuery } from '@apollo/client';

import { GET_RATES } from '../Queries/RateQueries';

/**
 *
 *
 * @return {*}
 */
function ExchangeRate() {
  const [getRate, { loading, error, data, networkStatus }] = useLazyQuery(
    GET_RATES,
    {
      variables: { currency: 'USD' },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) {
    return 'Refetching!';
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <button onClick={() => getRate({ variables: { currency: 'AUD' } })}>
        Refetch
      </button>
      {data &&
        data.rates &&
        data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))}
    </div>
  );
}

export default ExchangeRate;
