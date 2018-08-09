import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Users from './components/users/Users';
import AuthProvider from './AuthProvider';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="container">
        <AuthProvider>
          <Header />
          <h2>Client Auth with React Context</h2>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/users" component={Users} />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
