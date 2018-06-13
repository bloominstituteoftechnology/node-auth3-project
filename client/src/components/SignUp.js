import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            race: ''
        }
    }

    register = event => {
        event.preventDefault();
        const {username, password, race} = this.state
    
        axios
        .post('http://localhost:5500/api/auth/register', {username, password, race})
        .then((response) => {
            this.setState({login: response.data, username:'', password:'', race:''})
        })
        .catch(err => {
            console.log('error', err)
        })
    }
    
    handleInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    render() {
        return (
            <div className="LoginForm">
                <form>
                <input 
                    onChange={this.handleInput}
                    placeholder="Username"
                    value={this.username}
                    name="username"
                />
                <input 
                    onChange={this.handleInput}
                    placeholder="Password"
                    value={this.password}
                    name="password"
                />
                <input 
                    onChange={this.handleInput}
                    placeholder="race"
                    value={this.race}
                    name="race"
                />  
                 <button onSubimt={this.register}>Submit</button>
                </form>
            </div>
        )
    }    
}

export default SignUp;