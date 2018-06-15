import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import UserLogin from './components/user/UserLogin';
import Users from './components/user/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      username: '',
      users: []      
    }
  }

  componentDidMount() {
    // get the token from somewhere
    const token = localStorage.getItem('jwt');
    this.setState({ isLogged: token });
  }

  handleOnClickLogin = (event) => {
    this.props.history.push('/login');
  }

  handleOnClickRegister = (event) => {
    this.props.history.push('/register');
  }

  handleOnClickLogout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }
    this.props.history.push('/');
    this.setState({ isLogged: false });
  };

  handleSubmitLogin = (username) => {
    this.setState({ isLogged: true, username: username});
    console.log("Username : ", username);
    this.props.history.push('/users');
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.isLogged && <h1 className="App-title">Authentication using JWTs</h1>}
          {this.state.isLogged && <h1 className="App-title">Welcome Back {this.state.username}</h1>}
        </header>
        {!this.state.isLogged && <div>
          <button onClick={this.handleOnClickLogin}>Login</button>
          <button onClick={this.handleOnClickRegister}>Register</button>
        </div>}
        {this.state.isLogged && <div>
          <button onClick={this.handleOnClickLogout}>Logout</button>
        </div>}
        <Route path="/login" render={() => <UserLogin onClickLogin={this.handleSubmitLogin}/>} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
