import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Group, Form, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.reset = {
      username: "",
      password: "",
      race: "",
    }
    this.state = {
      username: "",
      password: "",
      race: "",
      redirect: false
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  inputSpitter = (name, type="text", handler=this.handleInputChange) => {
    return <Input 
      type={type} 
      name={name} 
      value= {this.state[name]} 
      onChange={handler}
    />;
  }

  submitAndRegister = (loginObject) => {
    axios.post('http://localhost:5500/api/auth/register',loginObject)
      .then(res => {
        console.log(res.data.token);
        this.props.send(res.data.token);
        this.setState({ ...this.reset, redirect: true})
      })
      .catch(err => {
        console.log("submitAndRegister ERROR:",err);
        alert('Registration unsuccessful. Please try again.')
      })
  }

  submitAndLogin = (loginObject) => {
    axios.post('http://localhost:5500/api/auth/login',loginObject)
      .then(res => {
        console.log("submitAndLogin `this`:",this);
        this.props.send(res.data.token);
        
      })
      .catch(err => {
        console.log("submitAndLogin ERROR:",err);
        alert('Login unsuccessful. Please try again.')
      });
  }

  formSubmit = (e) => {
    e.preventDefault();

    // const instance = axios.create({
    //   headers: { "Access-Control-Allow-Credentials": true }
    // });
    
    const loginObject = { 
      username: this.state.username, 
      password: this.state.password,
      race: this.state.race
     };

     if (this.props.match.path === '/register') {
      //  this.submitAndRegister(loginObject);
     } else {
      //  this.submitAndLogin(loginObject);
      axios.post('http://localhost:5500/api/auth/login',loginObject)
      .then(res => {
        console.log("submitAndLogin `this`:",this);
        this.props.send(res.data.token);
        this.setState({ ...this.reset, redirect: true });
      })
      .catch(err => {
        console.log("submitAndLogin ERROR:",err);
        alert('Login unsuccessful. Please try again.')
      });
     }
    // } else {
    //   let reqObj = {
    //     url: 'http://localhost:5000/api/register',
    //     method: 'post',
    //     data: logInObj,
    //     withCredentials: true
    //   };
    // instance(reqObj)
    //   // .then(() => this.setState({ redirect: true }))
    //   .then(() => {
    //     reqObj = {
    //       url: 'http://localhost:5000/api/login',
    //       method: 'post',
    //       data: logInObj,
    //       withCredentials: true
    //     };

    //     instance(reqObj)
    //     .then(res => {
    //       console.log(res);
    //       this.setState({ redirect: true });
    //     })
    //     .catch(error => {
    //       console.log("Login error:",error);
    //       alert('You are registered, but login was unsuccessful. Please try again.');
    //     });
    //   })
    //   .catch(error => {
    //     console.log("RegisterForm error:",error);
    //     alert('Registration was unsuccesful. Please try again.')
    //   });
    // }
  }

  render() {
    const dropDownOptions = [
      {text:"Man"},
      {text:"Dwarf"},
      {text:"Elf"},
      {text:"Giant"},
      {text:"Hobbit"},
      {text:"Yeti"}
    ];
    console.log("this.props",this.props);
    if (this.state.redirect) return <Redirect to="/users" />;
    return (
      <Form onSubmit={this.formSubmit} className="">
        <Form.Field>
          <label>Username</label>
          {this.inputSpitter('username')}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          {this.inputSpitter('password', 'password')}
        </Form.Field>
        {
          this.props.match.path === '/register' ?
          <Form.Field>
            <label>Race</label>
            {/* <Form.Select name="race" value={this.state.race} onChange={this.handleInputChange}/> */}
            {this.inputSpitter('race')}
          </Form.Field>
          :
          null
        }
        <Button>Submit</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {};

export default LoginForm;
