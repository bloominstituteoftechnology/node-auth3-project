import React, { Component } from 'react';
import { AuthContext } from '../../AuthProvider';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <AuthContext.Consumer>
        {context => (
          <div>
            <h2>Login</h2>
            <div className="d-flex flex-column col-6">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  context.login(this.state);
                }}
                className=""
              >
                <div className="input-group mb-3">
                  <input
                    onChange={this.handleChange}
                    value={this.state.username}
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.password1}
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <button className="btn">Login</button>
              </form>
            </div>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Login;
