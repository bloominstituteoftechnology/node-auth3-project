import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { InputGroup, Input, Col, Button } from "reactstrap";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      race: "",
      redirect: false,
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePass = e => {
    this.setState({ password: e.target.value });
  };

  handleRace = e => {
    this.setState({ race: e.target.value });
  };

  registerUser = () => {
    axios
      .post("http://localhost:5500/api/auth/register", {
        username: this.state.username,
        password: this.state.password,
        race: this.state.race
      })
      .then(res => {
          if (res.status === 201) {
              this.setState({ redirect: true })
            }
            console.log("success!, you have been registered!", res);
      })
      .catch(error => {
        console.log("Error", error);
      });
    this.setState({ username: "", password: "", race: "" });
  };

  render() {
    const redirect = this.state.redirect
    if (redirect) {
        return <Redirect to="/dashboard" />
    }
    return (
      <div>
        <InputGroup
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          
          <Col sm="3">
            <Input
            style={{
                margin: '10px',
            }}
              placeholder="username"
              type="text"
              onChange={this.handleUsername}
              value={this.state.username}
            />
          </Col>
          <Col sm="3">
            <Input
             style={{
                margin: '10px',
            }}
              placeholder="password"
              type="password"
              onChange={this.handlePass}
              value={this.state.password}
            />
          </Col>
          <Col sm="3">
            <Input
             style={{
                margin: '10px',
            }}
              placeholder="race"
              type="text"
              onChange={this.handleRace}
              value={this.state.race}
            />
          </Col>
          <Button color="danger" onClick={this.registerUser} style={{ marginTop: '10px' }} >
            Submit
          </Button>
        </InputGroup>
      </div>
    );
  }
}

export default SignUp;
