import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          loggedIn: false,
          username: '',
          password: '',
        }
      }

    login = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4400/api/login/', {
            "username": this.state.username, 
            "password": this.state.password
        }).then(res => {
            if (res){
                this.setState({
                    loggedIn: true, 
                    username: '',
                    password: '',
                })
                localStorage.setItem("token", res.data.token);
                this.props.history.push('/users')
            }
        }).catch(err => console.log(err))
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render(props){
        return (
            <div>
                <div className="login">
                    <h4>Login</h4>
            
                    <form onSubmit={this.login}>
                        <input
                        required
                        autoFocus
                        onChange={this.inputHandler}
                        name="username"
                        value={this.state.username}
                        placeholder="Name"
                        type="text"
                        >{this.value}</input>
                        <input
                        required
                        onChange={this.inputHandler}
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        type="password"></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;