import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, department } = this.state;
    this.props.registerUser({
      username,
      password,
      department
    }, this.props.history);
  }

  render() {
    return (
      <div className='register'>
        <Typography variant='headline' style={{ marginTop: '2rem' }}>Register!</Typography>
        <form onSubmit={this.handleSubmit}>
          <Input
            type='text'
            name='username'
            onChange={this.handleInputChange}
            placeholder='Username'
            style= {{ marginBottom: '1rem', width: '40%' }}
          />
          <br />
          <Input
            type='password'
            name='password'
            onChange={this.handleInputChange}
            placeholder='Password'
            style= {{ marginBottom: '1rem', width: '40%' }}
          />
          <br />
          <Input
            type='text'
            name='department'
            onChange={this.handleInputChange}
            placeholder='Department'
            style= {{ marginBottom: '1rem', width: '40%' }}
          />
          <br />
          <Button variant='contained' color='primary' type='submit'>
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
