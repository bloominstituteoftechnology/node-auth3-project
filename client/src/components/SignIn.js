import React, { Component } from 'react';
import '../App.css';
import Form from './Form';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleLoginSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/login`, this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data);
        this.props.history.push('/api/users');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Form type={"login"}
              username={this.state.username}
              password={this.state.password}
              department={this.state.department}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleLoginSubmit}
        />
      </div>
    );
  }
}

export default SignIn;
