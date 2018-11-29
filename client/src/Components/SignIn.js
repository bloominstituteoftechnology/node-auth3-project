import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
  height: 50vh;
  justify-content: center;
  font-size: 14px;
  font-family: Helvetica;
  border-radius: 15px;
  background: lightgray;
  max-width: 50%;
  margin: 0 auto;

  form {
    display: flex;
    flex-flow: column nowrap;
    width: 50%;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      input {
        margin: 40px 20px;
        width: 200px;
        height: 30px;
        text-align: center;
        border: 2px solid black;
      }
    }

    select {
      border: 2px solid black;
      width: 220px;
      height: 30px;
      margin: 50px 0;
      font-size: 14px;
    }
  }

  button {
    border: 2px solid black;
    width: 100px;
    height: 25px;
    border-radius: 15px;
    margin-top: 30px;
  }
`;
export default class SignIn extends Component {
  state = {};

  handleChange = e => {
    if (!e.target.name) {
      this.setState({
        department : e.target.value,
      });
    }
    else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/login', this.state)
      .then(res => {
        if (res.data.token) {
          const token = JSON.stringify(res.data.token);
          window.localStorage.setItem('token', token);
          this.props.history.push('/api/users');
        }
      })
      .catch(e => {
        if (!this.state.username | !this.state.password) {
          alert('Please provide a username and password!');
        }
        else {
          alert('Please provide a valid username and password.');
        }
      });
  };

  render() {
    return (
      <Container>
        <h1>LOGIN</h1>
        <form>
          <div>
            <input name='username' type='text' placeholder='username' onChange={this.handleChange} />
            <input name='password' type='password' placeholder='password' onChange={this.handleChange} />
          </div>
          <button onClick={this.handleSubmit}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </form>
        <button
          onClick={() => {
            this.props.history.push('/');
          }}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </Container>
    );
  }
}
