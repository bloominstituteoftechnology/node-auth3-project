import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import "./Signin.css";
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pw: '',
      race: '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name] : event.target.value });
  };

  handNewUser = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:5500/api/auth/register', {
        username: this.state.name,
        password: this.state.pw,
        race: this.state.race
      })
      .then(response => {

        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })

      this.setState({
        name: '',
        pw: '',
        race: ''
      })

  }

  handleReturningUser = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:5500/api/auth/login', {
        username: this.state.name,
        password: this.state.pw,
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        this.props.loginHandler('Logged In')
        // document.window.sessionStorage.accessToken = response.body.access_token;
        

        console.log(sessionStorage.getItem('token'))
      })
      .catch(err => {
        console.log(err)
      })

      this.setState({
        name: '',
        pw: '',
      })

  }

  render() {

    return (
      <div className="containerM">
        <div className="inputC">
        <FormControl >
          <InputLabel htmlFor="name-simple">UserName</InputLabel>
          <Input id="name-simple" name="name" value={this.state.name} onChange={this.handleChange} />
        </FormControl>
        <FormControl >
          <InputLabel htmlFor="name-simple">Password</InputLabel>
          <Input id="name-simple2" name="pw" type="password" value={this.state.pw} onChange={this.handleChange} />
        </FormControl>
        <FormControl >
          <InputLabel htmlFor="name-simple">Race</InputLabel>
          <Input id="name-simple3" name="race"  value={this.state.race} onChange={this.handleChange} />
        </FormControl>
        <Button variant="contained" color="primary" onClick={this.handleReturningUser}>
            login
        </Button>
        <Button variant="contained" color="primary" onClick={this.handNewUser}>
            Sign-Up
        </Button>
      </div>

      </div>
     )
  }
}

export default SignIn;
