import React from 'react'
import axios from 'axios';


class Login extends React.Component {
    state = {
        username: 'sam',
        password: 'pass',
    };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor='username' />
                <input
                    value={this.state.username}
                    onChange={this.handleChange}
                    name='username'
                    type='text'
                />
            </div>
            <div>
                <label htmlFor='password' />
                <input
                    value={this.state.password}
                    onChange={this.handleChange}
                    name='password'
                    type='password'
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
      </>
    )
  };

  handleSubmit = e => {
      e.preventDefault();

      const endpoint = 'http://localhost:6500/api/auth/login';
      axios
        .post(endpoint, this.state)
        .then(res => {
            localStorage.setItem('token', res.data.token);
        })
        .catch(err => {
            console.log('LOGIN ERROR', err)
        })
  }

  handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
  }

}

export default Login;

