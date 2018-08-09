import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

    inputChangeHandler = event => {
      this.setState({ [event.target.name]: event.target.value })
    };

    submitHandler = event => {
      event.preventDefault();

      axios
      .post('http://localhost:8080/api/login', this.state)
      .then(res => {
        const token = res.data;

        localStorage.setItem('jwt', token);
      })
      .catch(err => {
        console.error('Axios Failed')
      })
    }

  render() {
    return (
      <div className="Signin">
        <form onSubmit="submitHandler">
          <div>
            <label htmlFor="username" />
            <input name = "username" value={this.state.username} onChange={this.inputChangeHandler} type="text" />
          </div>
          <div>
            <label htmlFor="password" />
            <input name = "password" value={this.state.password} onChange={this.inputChangeHandler} type="password" />
          </div>
          <div>
            <button type="submit">
              Signin
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
