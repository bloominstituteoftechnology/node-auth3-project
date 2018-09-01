import React, { Component } from 'react';
import '../App.css';
import {Route} from 'react-router-dom';
import axios from 'axios'

class Users extends Component {
  state = {
      users: ''
  }  
  render() {
    return (
      <div className="Users">
        {this.state.users.map(users => {
            <li key = {user.id}>
                {user.username}
            </li>
        })}        
      </div>
    );
  }

  inputChangeHandler = (e) => {
      e.preventDefault();
      const {name, value} = e.target;
      console.log('name: ', name, 'value: ', value);
      this.setState({[name]: value})
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log('state', this.state)
    
    axios
        .get('http://localhost:9000/api/login', this.state)
        .then(res =>{
            console.log('data', res.data)
            const token = res.data
        }).catch()
        .catch(err => {
            console.error('Axios failed')
        })
  }
}

export default Login;