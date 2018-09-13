import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from './components/Register';
import axios from 'axios';
import './App.css';


export default class App extends Component {
  constructor(){
    super();
    this.state={
      username: '', 
      password: '',
      department: '',
    }
  }

inputHandler = e => {
  this.setState({[e.target.name]: e.target.value})
}

onRegisterHandler = e => {
  e.preventDefault(); 
  axios
    .post('http://localhost:9800/api/register', {
      username: this.state.username, 
      password: this.state.password,
      department: this.state.department,
  })
    .then(data => {
        console.log(data)
    })
}


  render() {
    console.log('running')
    return (
      <div className="App">  
      <Route
            path="/register"
            render={props => (
              <Register
                {...props}
                inputHandler={this.inputHandler}
                onRegisterHandler={this.onRegisterHandler}
              />
            )}
          />
      </div>
    );
  }
}
