import React, { Component } from 'react';
import axios from 'axios';

//environmental variable
const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: '',
  password: '',
};

export default class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: { ...initialUser },
        message: '',
      };
    }

inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
      } //user :{copying whatever is in user, replacing the property we are sent}

submitHandler = (event) => {
    event.preventDefault();
    //using environmental variables 
    axios.post(`${url}/api/register`, this.state.user)
    .then((res) => {
        if (res.status === 200) {
          this.setState({
            message: 'Registration successful',
            user: { ...initialUser },
          });
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.setState({
          message: 'Registration failed.',
          user: { ...initialUser },
        });
      });
  }


render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.inputHandler}
          />
            <input
            type="text"
            id="department"
            name="department"
            value={this.state.user.department}
            onChange={this.inputHandler}
          />
            <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.user.password}
            onChange={this.inputHandler}
          />
            </form>
        { this.state.message
          ? (<h4>{this.state.message}</h4>)
          : undefined
        }
      </div>

    );
  }
}
