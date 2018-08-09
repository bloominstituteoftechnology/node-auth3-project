import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
    }

    handleChange = (event) => { 
        this.setState({[event.target.name]: event.target.value})
      }

      logIn = () => {
        const user = {username: this.state.username, password: this.state.password};
        axios.post('http://localhost:8000/api/login', user)
        .then(response => {
          console.log(response);
          localStorage.setItem("token", JSON.stringify(response.data));
          this.setState({username: '', password: '', loggedIn: true})
        })
        .catch(err => {
          console.log(err);
          <Redirect to='/signup' />
        })
      }

    render (){
    return (
        <div>
            <h3>Log In</h3>
        <input 
            type='text'
            name='username'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleChange}
            />
            <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            />
            <button onClick={this.logIn}>Log in</button>
            {this.state.loggedIn ? <Redirect to='/users' /> : null }
        </div>
    )}
}

export default Login;