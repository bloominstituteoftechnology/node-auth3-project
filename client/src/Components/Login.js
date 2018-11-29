import React, { Component } from 'react';
import axios from 'axios'
import { Form } from './';
class Login extends Component {
  state = {
    hasLoggedOn: false
  }
  login = async (creds) => {
    try {

      const login = await axios.post(process.env.API_REACT_HOST + '/api/login', creds)
      console.log('login', login)
      window.localStorage.setItem('react_auth_token', login.data.token);
      await this.setState({ loggedIn: true })
    } catch(err) {
      console.log(err)
    }
  }
  render() { 
    return ( 
      <div className="Login">
        <Form {...{ 
          inputs: { username: '', password: ''},
          onSubmit: this.login,
          formTitle: 'login',
          action: 'login'
        }} />
      </div>
     )
  }
}
 
export default Login;