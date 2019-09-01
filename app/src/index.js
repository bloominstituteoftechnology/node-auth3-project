import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './components/DesignComponents/theme';
import GlobalStyles from './DesignComponents/GlobalStyles';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyles />
      <Route path='/' component={App} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
