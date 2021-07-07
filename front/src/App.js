import React from 'react';
import '@fontsource/roboto';
import { Route, NavLink, HashRouter } from 'react-router-dom';

// import logo from './logo.svg';
import './Styles/App.css';

// import StockChart from './Components/Chart';
import Home from './Pages/Home';
import Stuff from './Pages/Stuff';
import Contact from './Pages/Contact';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <hi>Stock Market</hi>
        <ul className="header">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/stuff">Stuff</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/stuff" component={Stuff} />
          <Route path="/contact" component={Contact} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
