import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Input, InputGroup, Button, Col } from 'reactstrap';

class SignIn extends Component {
    constructor() {
      super();
      this.state = {
        username: "",
        password: "",
        redirect: false,
      };
    }
  
    handleUsername = e => {
      this.setState({ username: e.target.value });
    };
  
    handlePass = e => {
      this.setState({ password: e.target.value });
    };
  
    logInUser = e => {
      axios
        .post("http://localhost:5500/api/auth/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(res => {
          console.log("res status", res.status)
          if (res.status === 200) {
            this.setState({ redirect: true })
          }
          console.log("success!, you have been logged in!", res);
          localStorage.setItem("authorization", res.data.token)
        })
        .catch(error => {
          console.log("Error", error);
        });
      this.setState({ username: "", password: "" });
  
    };
  
    render() {
        const redirect = this.state.redirect
      if (redirect) {
          return <Redirect to="/users" />
      }
        return (
        <div>
          <InputGroup
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button color="danger" onClick={this.logInUser}>
              Submit
            </Button>
            <Col sm="3">
              <Input
                placeholder="username"
                type="text"
                onChange={this.handleUsername}
                value={this.state.username}
              />
            </Col>
            <Col sm="3">
              <Input
                placeholder="password"
                type="password"
                onChange={this.handlePass}
                value={this.state.password}
              />
            </Col>
            
           
          </InputGroup>
          <br />
          <Link
              style={{ alignSelf: "center", textDecoration: "underline" }}
              to={"/signup"}
            >
              Don't have an account? Register Here{" "}
            </Link>
        </div>
      );
    }
  }
  
  export default SignIn;