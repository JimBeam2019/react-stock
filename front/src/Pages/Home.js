import React, { useState, useEffect } from 'react';
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
  const [candleStockData, setcandleStockData] = useState([]);
  const [lineAreaData, setlineAreaData] = useState([]);
  const [quarterReportData, setQuarterReportData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});

  const [getCompanyStocks, { loading, error, data, networkStatus }] =
    useLazyQuery(GET_COMPANY_STOCKS, {
      variables: { companyId: 1 },
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    const compStockData = convertCompStockData(data);
    setcandleStockData(compStockData.candleStockData);
    setlineAreaData(compStockData.lineAreaData);
    setQuarterReportData(convertQuarterReportData(data));
    const tempCompanyInfo = convertCompanyInfo(data);

    setCompanyInfo({
      title: `Title: ${tempCompanyInfo.title}`,
      foundedYear: `Founded Year: ${tempCompanyInfo.foundedYear}`,
      website: `Website: ${tempCompanyInfo.website}`,
      employeeNum: `Employee Number: ${tempCompanyInfo.employeeNum}`,
      headquarterAddress: `HQ Address: ${tempCompanyInfo.headquarterAddress}`,
    });
  }, [data]);

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
          <CandleStickChartComponent stocks={candleStockData} />
        </Grid>
        <Grid container item xs={8} spacing={3}>
          <LineAreaChartComponent stocks={lineAreaData} />
          <GroupedBarComponent quarterReport={quarterReportData} />
        </Grid>
        <Grid container item xs={3} spacing={3}>
          <List component="nav">
            <ListItem>
              <ListItemText primary={companyInfo.title} />
            </ListItem>
            <ListItem>
              <ListItemText primary={companyInfo.foundedYear} />
            </ListItem>
            <ListItem>
              <ListItemText primary={companyInfo.website} />
            </ListItem>
            <ListItem>
              <ListItemText primary={companyInfo.employeeNum} />
            </ListItem>
            <ListItem>
              <ListItemText primary={companyInfo.headquarterAddress} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
