import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import userInfo from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  userInfo,
  applyMiddleware(thunk)
);

store.subscribe(() => localStorage.setItem('user', JSON.stringify(store.getState())));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
