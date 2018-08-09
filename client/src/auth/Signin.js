import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    state= {
        username: '',
        password: ''
    };

  render() {
    return (
      <div className="Signin">
        <h1> Signin Component </h1>
            <form action="">
                <div>
                    <input 
                        name="username"
                        value={this.state.username} 
                        onChange={this.inputChangeHandler}
                        type="text" />
                </div>
                <div>
                    <input 
                        name="password"
                        value={this.state.password} 
                        onChange={this.inputChangeHandler}
                        type="password" />
                </div>
                <div>
                    <button type="button">Signin</button>
                </div>
            </form>
      </div>
    );
  }

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submiteHandler = event => {
      event.preventDefault();

      axios.port('http://localhost:8001/api/login', this.state).then(res => {
          console.log('data', res.data);
      }).catch(err => {
          console.error('Failed');
      })
      console.log('state, this.state');
  }
}

export default Signin;