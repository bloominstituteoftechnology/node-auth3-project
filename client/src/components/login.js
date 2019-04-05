import React from 'react';
import Axios from 'axios';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:5000/api/users/login';

    Axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name='username'
              id='username'
              value={this.state.username}
              onChange={this.handleInputChange}
              type='text'
              placeholder='Username'
            />
            <br/>
            <input
              name='password'
              id='password'
              value={this.state.password}
              onChange={this.handleInputChange}
              type='text'
              placeholder='Password'
            />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;