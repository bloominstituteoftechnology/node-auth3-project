import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser({
      username,
      password
    }, this.props.history);
  }

  render() {
    return (
      <div className='login'>
        <Typography variant='headline' style={{ marginTop: '2rem' }}>Login!</Typography>
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
          {
            this.props.error
            ? <React.Fragment>
                <Typography color='error'>{this.props.error}</Typography><br />
              </React.Fragment>
            : null
          }
          <Button variant='contained' color='primary' type='submit'>
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
