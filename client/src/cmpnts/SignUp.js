import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          race: ''
        }
      }
    
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addUser = () => {
        const userInfo={ username: this.state.username, password: this.state.password, race: this.state.race }
        axios
            .post('http://localhost:5500/api/auth/register', userInfo)
            .then(response => {
                this.setState({ username: '', password: '', race: '' })
            })
            .catch(error => {
                console.log(error)
            })
    }

    enterPressed = event => {
        event.preventDefault();
        var code = event.keyCode || event.which;
        if (code === 13) {
            return this.addUser(event);
        }
    }

    render() { 
        return ( 
            <div>
                <form className="input-box">
                <input 
                    className="username-input"
                    onChange={this.handleInputChange}
                    onKeyUp={this.enterPressed.bind(this)}
                    placeholder="Enter Username"
                    name="username"
                    value={this.state.username}
                />
                <input
                    className="password-input"
                    onChange={this.handleInputChange}
                    onKeyUp={this.enterPressed.bind(this)}
                    placeholder="Enter Password"
                    name="password"
                    value={this.state.password}
                />
                <input
                    className="race-input"
                    onChange={this.handleInputChange}
                    onKeyUp={this.enterPressed.bind(this)}
                    placeholder="Enter Race"
                    name="race"
                    value={this.state.race}
                />
                </form>
                <button 
                    className="submit-button"
                    onClick={this.addUser}
                >
                Sign Up
                </button>
        </div>            
        )
    }
}
 
export default SignUp;
