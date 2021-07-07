import React from 'react';
import { NetworkStatus, useLazyQuery } from '@apollo/client';

import CandleStickChartComponent from '../Components/CandleStickChartComponent';
import LineAreaChartComponent from '../Components/LineAreaChartComponent';
import StackBarChartComponent from '../Components/StackBarChartComponent';

import { GET_COMPANY_STOCKS } from '../Queries/CompanyQueries';

/**
 *
 *
 * @class Home
 * @extends {Component}
 */
function Home() {
  const [getCompanyStocks, { loading, error, data, networkStatus }] =
    useLazyQuery(GET_COMPANY_STOCKS, {
      variables: { companyId: 1 },
      notifyOnNetworkStatusChange: true,
    });

  if (networkStatus === NetworkStatus.refetch) {
    return 'Refetching!';
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const candleStickData =
    data && data.getAllCompanyDailyStocks
      ? data.getAllCompanyDailyStocks.map(
          ({ date, open, close, high, low }) => {
            const dateMoment = date.split('-');
            const year = dateMoment[0];
            const month = dateMoment[1];
            const day = dateMoment[2];

            return {
              x: new Date(year, month, day),
              open,
              close,
              high,
              low,
            };
          }
        )
      : [];

  const lineAreaData =
    data && data.getAllCompanyDailyStocks
      ? data.getAllCompanyDailyStocks.map(({ date, close }) => {
          const dateMoment = date.split('-');
          const year = dateMoment[0];
          const month = dateMoment[1];
          const day = dateMoment[2];

          return { x: new Date(year, month, day), y: close };
        })
      : [];

  return (
    <div>
      <button onClick={() => getCompanyStocks({ variables: { companyId: 2 } })}>
        Get Data
      </button>
      <h2>Home</h2>
      <CandleStickChartComponent stocks={candleStickData} />
      <LineAreaChartComponent stocks={lineAreaData} />
      <StackBarChartComponent />
    </div>
  );
}

export default Home;
