import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            "username": 'hermione',
            "password": 'temp'
        }
    }
  

    //change handler

    handleChange =  (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    //click handler

    handleSubmit = (e) => {
        e.preventDefault();

        let promise = axios.post("http://localhost:5500/api/auth/login", this.state);

        promise
            .then(response => {
                console.log("response", response);
                localStorage.setItem("jwt", response.data.token);
                console.log(localStorage.getItem("jwt"));
                this.props.history.push("/users");
            })
            .catch(err => {
                console.log({Error: err});
            });
    };

    render() {
        console.log({"username": this.state.username, "password": this.state.password})
        console.log(localStorage);
        return (
            <div>
            <form className="input-field" onSubmit={this.handleSubmit}>
                <h2>Log-in to enter</h2>
                <div className="label">
                    <label>Username:</label>
                    <input className="text" onChange={this.handleChange} type="text" name="username" value={this.state.username}/>
                </div>
                <div className="label">
                    <label htmlFor="password">Password:</label>
                    <input className="text" onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
                </div>
                <button className="log-button" type="submit">Log-In Here</button>
                <div className="register-link"><Link to="/register" className="link-style">New User? Register Here!</Link></div>


            </form>
            </div>
        );
    }
}

export default Login;
