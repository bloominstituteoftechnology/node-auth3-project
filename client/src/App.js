import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/signup' component={Register} />
      <Route path='/signin' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
    </div>
  );
}

export default App;
