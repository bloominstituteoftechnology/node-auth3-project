import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Users from './components/users/Users';

import './App.css';

const Home = props => {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
};

class App extends Component {
  state = {
    department: 'IT',
  };

  setDepartment = (dept) => {
    this.setState({department: dept});
    console.log('APP', dept);
  };

  render() {
    return (
      <div className="App">
        <header>
          <Navigation {...this.props} />
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/users" department={this.state.department} component={Users} />
          <Route path="/login" setDepartment={this.setDepartment} component={Login} />
          <Route path="/register" setDepartment={this.setDepartment} component={Register} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
