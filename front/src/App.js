import React from 'react';
import '@fontsource/roboto';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
// import logo from './logo.svg';
import './Styles/App.css';

import Home from './Pages/Home';
import Account from './Pages/Account';
// import Contact from './Pages/Contact';

function App() {
  return (
    <Container maxWidth="xl">
      <HashRouter>
        <div className="App">
          <AppBar>
            <Toolbar>
              <div className="floatLeft">
                <Typography variant="h6">Stock Market</Typography>
              </div>

              <div className="floatRight">
                <ul className="header">
                  <li>
                    <NavLink to="/">
                      <Button color="secondary">Home</Button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/account">
                      <Button color="secondary">Account</Button>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Toolbar>
          </AppBar>

          {/* <li>
            <NavLink to="/contact">Contact</NavLink>
          </li> */}

          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/account" component={Account} />
            {/* <Route path="/contact" component={Contact} /> */}
          </div>
        </div>
      </HashRouter>
    </Container>
  );
}

export default App;
