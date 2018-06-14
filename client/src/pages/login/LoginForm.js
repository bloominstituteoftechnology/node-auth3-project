import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Dropdown, Group, Form, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.reset = {
      username: "",
      password: "",
      race: "",
    };
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

  dropdownInput = (e, data) => {
    console.log("dropdownInput:",e.target.name,data.value);
    this.setState({ race: data.value });
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
        this.setState({ ...this.reset });
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log("submitAndRegister ERROR:",err);
        alert('Registration unsuccessful. Please try again.')
      });
  }

  submitAndLogin = (loginObject) => {
    axios.post('http://localhost:5500/api/auth/login',loginObject)
      .then(res => {
        console.log("submitAndLogin `this`:",this);
        this.props.send(res.data.token);
        this.setState({ ...this.reset });
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log("submitAndLogin ERROR:",err);
        alert('Login unsuccessful. Please try again.')
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    
    const loginObject = { 
      username: this.state.username, 
      password: this.state.password,
      race: this.state.race
     };

     if (this.props.match.path === '/register') {
       this.submitAndRegister(loginObject);
     } else {
       this.submitAndLogin(loginObject);
     }
  }

  render() {
    const dropDownOptions = [
      {value: 'man', text:"Man"},
      {value: 'dwarf', text:"Dwarf"},
      {value: 'elf', text:"Elf"},
      {value: 'giant', text:"Giant"},
      {value: 'hobbit', text:"Hobbit"},
      {value: 'orc', text:"Orc"},
      {value: 'yeti', text:"Yeti"}
    ];
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
            <Dropdown 
              placeholder='Select your race'
              options={dropDownOptions} 
              value={this.state.race} 
              onChange={this.dropdownInput}/>
            {/* {this.inputSpitter('race')} */}
          </Form.Field>
          :
          null
        }
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default LoginForm;
