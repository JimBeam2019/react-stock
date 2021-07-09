import React, { useState, useEffect } from 'react';
import { NetworkStatus, useLazyQuery } from '@apollo/client';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { VictoryPie } from 'victory';

import { GET_USER_INFO } from '../Queries/UserQuery';
import { convertUserFundData } from '../Utils/Utils';

/**
 *
 *
 * @return {*}
 */
function Account() {
  const [user, setUser] = useState({});
  const [userFund, setUserFund] = useState([]);
  const [getUserInfo, { loading, error, data, networkStatus }] = useLazyQuery(
    GET_USER_INFO,
    { notifyOnNetworkStatusChange: true }
  );

  useEffect(() => {
    getUserInfo();
    if (data && data.getUserAccount) {
      setUser(data.getUserAccount);
    }
    if (data && data.getUserFunds) {
      setUserFund(data.getUserFunds);
    }
  }, [getUserInfo, data]);

  if (networkStatus === NetworkStatus.refetch) {
    return 'Refetching!';
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const pieData = convertUserFundData(userFund);
  const userName = `Name: ${user.userName}`;
  const userBalance = `Balance: ${user.balance}`;

  return (
    <div>
      <h2>Account</h2>
      <Grid container spacing={10} justify="center">
        <Grid container item xs={8} spacing={3}>
          <VictoryPie
            colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
            data={pieData}
          />
        </Grid>
        <Grid container item xs={4} spacing={3}>
          <List component="nav">
            <ListItem>
              <ListItemText primary={userName} />
            </ListItem>
            <ListItem>
              <ListItemText primary={userBalance} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default Account;
