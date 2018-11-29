import React, { Component } from "react";
import axios from "axios";
import { Inputform, SubmitBtn, Inputs, LoginLabel } from '../Styles.js';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: "",
  password: "",
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: ""
    };
  }

  inputHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  submitHandler = event => {
    event.preventDefault();
    axios
      .post(`${url}/api/login`, this.state.user)
      .then(res => {
        if (res.status === 200 && res.data) {
          localStorage.setItem('secret_token_key', res.data.token);
          this.setState({
            message: "Login successful",
            user: { ...initialUser }
          });
          this.props.history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: "Authentication failed...",
          user: { ...initialUser }
        });
      });
  };

  render() {
    return (
        <div>
            <LoginLabel htmlFor="username">Login</LoginLabel>
            <Inputform onSubmit={this.submitHandler}>
                <label htmlFor="username">Username:</label>
                <Inputs type="text" id="username" name="username" value={this.state.user.username} onChange={this.inputHandler}/>
                <label htmlFor="password">Password:</label>
                <Inputs type="text" id="password" name="password" value={this.state.user.password} onChange={this.inputHandler}/>
                <SubmitBtn type="submit">Submit</SubmitBtn>
            </Inputform>
            {
                this.state.message
                ? (<h4>{this.state.message}</h4>)
                : undefined
            }
        </div>
    );
  }
}

export default Login;
