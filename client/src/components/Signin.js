import React, { Component } from "react";
import { UikFormInputGroup, UikInput, UikButton } from "../@uik";
import "../@uik/styles.css";
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
    // event.preventDefault();

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
        <UikFormInputGroup onSubmit={this.handleSubmit}>
          <div>
            {/* <label htmlFor="username">Username</label> */}
            <UikInput
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            {/* <label htmlFor="password">Password</label> */}
            <UikInput
              label="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <UikButton primary type="submit">
              Sign In
            </UikButton>
          </div>
        </UikFormInputGroup>
      </Container>
    );
  }
}

export default Signin;
