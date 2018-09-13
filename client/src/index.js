import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import logger from 'redux-logger';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body, html, #root {
    width: 100%;
    height: 100%;
  }
  * {
    font-size: 16px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
