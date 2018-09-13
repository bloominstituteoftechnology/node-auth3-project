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
  console.log( 'state at point of handler', this.state)
  axios
    .post("http://localhost:9800/api/register", this.state)
    .then(res => {
        console.log('response', res.data);     
    })
    .catch(err => {
        console.log(err);
    })

  this.setState({username: '', password: '', department: ''});  
}


  render() {
    console.log('state', this.state)
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
