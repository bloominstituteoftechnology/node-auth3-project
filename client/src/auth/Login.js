import React from 'react';
import '../App.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  inputChangeHandler = event => {this.setState({ [event.target.name]: event.target.value})};

  submitHandler = event => {
    event.preventDefault();
    axios
        .post('http://localhost:8000/login', this.state)
        .then(res => {
            const token = res.data;
            localStorage.setItem('jwt', token)
        })
        .catch(err => {
            console.log(err)
        });
    console.log(this.state);
  }

  render() {
    return (
      <div className="formWrapper">
          <h1>Log in</h1>
            <Form onSubmit={this.submitHandler}>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.inputChangeHandler}
                        value={this.state.username}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.inputChangeHandler}
                        value={this.state.password}
                    />
                </FormGroup>
                <Button type="submit" color="success">Log in</Button>
            </Form>
      </div>
    );
  }
}

export default Login;