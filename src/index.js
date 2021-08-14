import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CountryPage from './pages/country.js';
import HomePage from './pages/home.js';

const App = ()=>{
  return (
    <Router>
      <Switch>
          <Route exact path="/countries-api/">
            <HomePage/>
          </Route>
          <Route path="/countries-api/Home">
            <HomePage/>
          </Route>
          <Route path="/countries-api/:countrycode" component={CountryPage}>
          </Route>
        </Switch>
    </Router>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'));