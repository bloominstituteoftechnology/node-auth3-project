import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class Register extends Component {
  state = {
    username: '',
    password: '',
    department: '',
    isAuthenticated: false
  }

  handleSubmit = event => {
    event.preventDefault();
    const loginInfo = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    }
    const endpoint = 'http://localhost:3300/api/register';
    axios.post(endpoint, loginInfo)
      .then(res => {
        console.log('reponse data from login', res.data);
        localStorage.setItem('jwt', res.data.token);
        if (res.data.token) {
          this.setState({ isAuthenticated: true });
        };
        this.props.login();
      }).catch(err => {
        console.log('err from login', err);
      });
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  render() {
    if (this.state.isAuthenticated === true) {
      return <Redirect to='/users' />
    }
    return (
      <div className="form">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h1>Register For a New Account</h1>
            <Label for="username">Username</Label>
            <Input onChange={this.handleInputChange} type="username" name="username" id="username" />
            <Label for="password">Password</Label>
            <Input onChange={this.handleInputChange} type="password" name="password" id="password" />
            <Label for="department">Department</Label>
            <Input onChange={this.handleInputChange} type="department" name="department" id="department" />
          </FormGroup>
          <Button>Submit</Button>
          {console.log(this.state)}
        </Form>
      </div>
    );
  }
}

