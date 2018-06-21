import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            race: "",
            password: ""
        }
    }

    
    handleChange =  (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    //click handler

    handleSubmit = (e) => {
        e.preventDefault();

        let promise = axios.post("http://localhost:5500/api/auth/register", this.state);

        promise
            .then(response => {
                console.log("response", response);
                localStorage.setItem("jwt", response.data.token);
                this.props.history.push("/users");
            })
            .catch(err => {
                console.log({Error: err});
            });
    };


    render() {
        console.log(this.state);
        return (
            <form className="input-field" onSubmit={this.handleSubmit}>
                <h2>New User?</h2>
                <div className="label">
                <label>Username:</label>
                    <input className="text" onChange={this.handleChange} type="text" name="username" required="true" placeholder="lightningBoltHarry"/>
                </div>
                <div className="label">
                <label>Password:</label>
                    <input className="text" onChange={this.handleChange} type="password" name="password" required="true" placeholder="Must be at least 8 chars"/>
                </div>
                <div className="label">
                <label>Race:</label>
                    <input className="text" onChange={this.handleChange} type="text" name="race" required="true" placeholder="e.g. wizard, muggle, hippogriff, etc."/>
                </div>
                <button className="log-button">Register User</button>
                <div className="register-link"><Link to="/login" className="link-style">Already have an account? Log in here.</Link></div>

            </form>
        );
    }
}

export default Register;
