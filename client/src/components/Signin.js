import React, { Component } from "react";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 400px;
  margin: 0 auto;
  flex-direction: column;
`;

class Signin extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:3000/api/login";
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log("ERROR");
      });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </Container>
    );
  }
}

export default Signin;
