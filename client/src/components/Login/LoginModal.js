import React, { Component } from "react";
import { StyledButton } from "../styles/styles";
import styled from "react-emotion";
import axios from "axios";

class LoginModal extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitData = () => {
    const { message } = this.props;
    if (message === "Login") {
      this.submitLogin();
    } else {
      this.submitRegister();
    }
  };

  submitLogin = () => {
    const { username, password } = this.state;
    axios
      .post("http://localhost:4444/api/login", { username, password })
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.loggingIn(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitRegister = () => {
    const { username, password, department } = this.state;
    axios
      .post("http://localhost:4444/api/register", { username, password, department })
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.registering(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { message, registering, loggingIn } = this.props;
    const { username, password, department } = this.state;
    return (
      <StyledModalBackground>
        <StyledModalCard>
          <StyledXWrapper>
            <div
              onClick={() => {
                message === "Login" ? loggingIn(false) : registering(false);
              }}
            >
              X
            </div>
          </StyledXWrapper>

          <h1>{message}</h1>
          <StyledInputWrapper>
            <input
              name={"username"}
              value={username}
              onChange={this.handleInput}
            />
            <input
              name={"password"}
              value={password}
              onChange={this.handleInput}            
            />
            {message !== "Login" && 
            <input
              name={"department"}
              value={department}
              onChange={this.handleInput}            
            />}
          </StyledInputWrapper>

          <StyledButton onClick={this.submitData}>Submit</StyledButton>
        </StyledModalCard>
      </StyledModalBackground>
    );
  }
}

export default LoginModal;

const StyledModalBackground = styled("div")`
  height: 100%;
  width: 100vw;
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  opacity: 0.9;
`;

const StyledModalCard = styled("div")`
  opacity: 1;
  background: #fff;
  padding: 25px 50px;

  width: 450px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInputWrapper = styled("div")`
  display: flex;
  justify-content: center;
  input {
    margin: 20px 10px;
  }
`;

const StyledXWrapper = styled("div")`
  display: flex;
  align-self: flex-end;
  div {
    font-size: 25px;
    font-weight: bold;
    transition: all 0.1s;
    :hover {
      color: #EB3E4A;
      transform: scale(1.1)
    }
    :active {
      
      transform: scale(1)
    }
  }
`;
