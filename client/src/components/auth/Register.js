import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { AuthContext } from '../../AuthProvider';

class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: '',
    departments: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <AuthContext.Consumer>
          {({ register }) => (
            <Fragment>
              <h2>Register</h2>
              <div className="d-flex flex-column col-6">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const user = {
                      username: this.state.username,
                      password: this.state.password1,
                      departments: this.state.departments
                    };
                    register(user);
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
                      type="text"
                      value={this.state.departments}
                      placeholder="Departments"
                      name="departments"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      onChange={this.handleChange}
                      type="password"
                      value={this.state.password1}
                      placeholder="Password"
                      name="password1"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      onChange={this.handleChange}
                      type="password"
                      value={this.state.password2}
                      placeholder="Verify Password"
                      name="password2"
                    />
                  </div>

                  {this.state.password1 !== this.state.password2 ? (
                    <p style={{ color: 'red', fontSize: '14px' }}>
                      Passwords must match
                    </p>
                  ) : null}
                  <button className="btn">Register</button>
                </form>
              </div>
            </Fragment>
          )}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default Register;
