import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import UserLogin from './components/user/UserLogin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      users: []      
    }
  }

  handleOnClickLogin = (event) => {
    this.props.history.push('/login');
  }

  handleOnClickRegister = (event) => {
    this.props.history.push('/register');
  }

  componentDidMount() {
    // get the token from somewhere
    const token = localStorage.getItem('jwt');

    this.setState({ isLogged: token });

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Authentication using JWTs</h1>
        </header>
        {!this.state.isLogged && <div>
          <button onClick={this.handleOnClickLogin}>Login</button>
          <button onClick={this.handleOnClickRegister}>Register</button>
        </div>}
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserLogin} />
      </div>
    );
  }
}

export default withRouter(App);
