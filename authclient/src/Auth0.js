import React, { Component } from 'react';
import Auth from './components/auth';
const Auth0 = App =>
  class extends Component {
    constructor() {
      super();
      this.auth = new Auth();
      this.state = {
        authenticated: false
      };
    }
    componentWillMount() {
      this.auth.handleAuthentication();
    }
    componentDidMount() {
      
    }
    login = () => {
      this.auth.login();
    };
    render() {
      return (
        <div>
          {this.auth.isAuthenticated() ? (
            <App />
          ) : (
            <button onClick={this.login}>Click me to login</button>
          )}
        </div>
      );
    }
  };

export default Auth0;
