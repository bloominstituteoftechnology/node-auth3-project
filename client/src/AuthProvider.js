import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user: {},
    isAuthenticated: false
  };

  login = user => {
    axios
      .post('http://localhost:8000/api/login', user)
      .then(res => {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('jwt', token);
        this.setState({ isAuthenticated: true, user });
        this.props.history.push('/users');
      })
      .catch(err => console.log(err));
  };
  logout = () => {
    localStorage.removeItem('jwt');
    this.setState({ isAuthenticated: false, user: {} });
    this.props.history.push('/login');
  };
  register = user => {
    console.log('posting user with the following attributes', user);
    axios
      .post('http://localhost:8000/api/register', user)
      .then(res => {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('jwt', token);
        this.setState({ isAuthenticated: true, user });
        this.props.history.push('/users');
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log('from inside auth provider', this.state);
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          login: this.login,
          logout: this.logout,
          register: this.register
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export { AuthContext };
export default withRouter(AuthProvider);
