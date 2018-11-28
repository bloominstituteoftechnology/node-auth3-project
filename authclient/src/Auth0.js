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
      this.auth.handleAuthentication(this.renderApp);
    }
    login = () => {
      this.auth.login();
    };

    renderApp = () => {
      this.setState({ authenticated: true });
    };
    render() {
      return (
        <div>
          {this.state.authenticated ? (
            <App />
          ) : (
            <button onClick={this.login}>Click me to login</button>
          )}
        </div>
      );
    }
  };

export default Auth0;
