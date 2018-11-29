import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './login/login';
import 'typeface-lato';
import './index.css';
import * as serviceWorker from './services/serviceWorker';

const App = () => (
  <Fragment>
    <Route exact path="/" component={Login} />
  </Fragment>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
serviceWorker.register();
