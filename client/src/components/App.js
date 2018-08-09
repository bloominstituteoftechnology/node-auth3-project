import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Users from './Users';

import './App.css';

const App = () => {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/users' component={Users} />
        </div>
      </Router>
    );
}

export default App;
