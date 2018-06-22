import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
  state = {
    username: 'samer',
    password: 'mellower'
  };

  submitHandler = event => {
    axios
      .post('http://localhost:5500/api/auth/login', this.state)
      .then(response => {
        localStorage.setItem('jwt', response.data.token);

        console.log('signin props', this.props);
        this.props.history.push('/users');
      })
      .catch(err => console.log('unable to post sign in'));
  }

  handleInput = event => {
    console.log('event.target\n', event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>Username</label>
          <input 
            value={this.state.username}
            onChange={this.handleInput}
            name="username"
            type="text" 
          />
        </div>

        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.handleInput}
            name="password"
            type="password"
          />
        </div>

        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }

}

export default Signin;