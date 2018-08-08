import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import SignUp from './components/SignUp';
import {Route} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/signup' component={SignUp} />
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();
