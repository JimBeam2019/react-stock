import React from 'react';
import { NetworkStatus, useLazyQuery } from '@apollo/client';
import { Grid, Button, List, ListItem, ListItemText } from '@material-ui/core';

import CandleStickChartComponent from '../Components/CandleStickChartComponent';
import LineAreaChartComponent from '../Components/LineAreaChartComponent';
import GroupedBarComponent from '../Components/GroupedBarComponent';

import { GET_COMPANY_STOCKS } from '../Queries/CompanyQueries';
import {
  convertCompStockData,
  convertQuarterReportData,
  convertCompanyInfo,
} from '../Utils/Utils';

/**
 *
 *
 * @return {*}
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

  const { candleStickData, lineAreaData } = convertCompStockData(data);
  const quarterReportData = convertQuarterReportData(data);
  const { title, foundedYear, website, employeeNum, headquarterAddress } =
    convertCompanyInfo(data);

  const compTitle = `Title: ${title}`;
  const compFoundedYear = `Founded Year: ${foundedYear}`;
  const compWebsite = `Title: ${website}`;
  const compEmployeeNum = `Founded Year: ${employeeNum}`;
  const compHQAdress = `Title: ${headquarterAddress}`;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => getCompanyStocks({ variables: { companyId: 2 } })}
      >
        Get Data
      </Button>
      <h2>Home</h2>
      <Grid container spacing={10} justify="center">
        <Grid container item xs={12} spacing={3}>
          <CandleStickChartComponent stocks={candleStickData} />
        </Grid>
        <Grid container item xs={8} spacing={3}>
          <LineAreaChartComponent stocks={lineAreaData} />
          <GroupedBarComponent quarterReport={quarterReportData} />
        </Grid>
        <Grid container item xs={3} spacing={3}>
          <List component="nav">
            <ListItem>
              <ListItemText primary={compTitle} />
            </ListItem>
            <ListItem>
              <ListItemText primary={compFoundedYear} />
            </ListItem>
            <ListItem>
              <ListItemText primary={compWebsite} />
            </ListItem>
            <ListItem>
              <ListItemText primary={compEmployeeNum} />
            </ListItem>
            <ListItem>
              <ListItemText primary={compHQAdress} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
