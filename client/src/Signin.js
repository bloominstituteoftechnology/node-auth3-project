import React, { Component } from 'react';
import axios from 'axios';

//import './Signin.css';

class Signin extends Component {
    state = {
        username: '',
        password: '',
    };

  render() {
    return (
      <div className="Signin">
        <form onSubmit = {this.signin}> 
            <div> 
                <input 
                    name = "username"
                    value = {this.state.username}
                    onChange = {this.handleChange}
                    type = "text" 
                    placeholder = "Username"
                />
            </div>
            <div> 
                <input
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleChange} 
                    type = "password" 
                    placeholder = "Password"
                />
            </div>
            <div> 
                <button type = "submit">Submit</button>
            </div>
        </form>
      </div>
    );
  }

handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
};

signin = event => {
    event.preventDefault();

    axios
    .post('http://localhost:9000/api/login', this.state)
    .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users');
    })
    .catch(err => {
        console.error('Axios Error', err);
    });
    };
}

export default Signin;