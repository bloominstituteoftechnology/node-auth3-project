import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      signUpUserName:"",
      signUpName:"",
      signUpPassword:"",
      logInUserName:"",
      logInPassword:"",
      authToken:""
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('authToken');
    this.setState({authToken:token})
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    axios
    .post("http://localhost:3300/login",{username:this.state.logInUserName,password:this.state.logInPassword})
    .then(response => {
      console.log(response);
      this.setState({authToken:response.token})
      localStorage.setItem('authToken', response.data.token)
    })
    .catch(error => console.log(error))
  }

  render() {
    if(this.state.authToken){
      return <h1>Welome</h1>
    } else {
      return (
        <div className="App">
          <h1>Sign Up</h1>
          <form name="sign-up" >
            Username: <input name="signUpUserName" onChange={this.changeHandler} type="text" value={this.state.signUpUserName} />
            Name: <input name="signUpName" onChange={this.changeHandler} type="text" value={this.state.signUpName} />
            Password: <input name="signUpPassword" onChange={this.changeHandler} type="text" value={this.state.signUpPassword} />
            <button type="submit">Sign Up</button>
          </form>

          <h1>Log In</h1>
          <form name="log-in" onSubmit={this.submitHandler}>
            Username: <input name="logInUserName" onChange={this.changeHandler} type="text" value={this.state.logInUserName} />
            Password: <input name="logInPassword" onChange={this.changeHandler} type="text" value={this.state.logInPassword} />
            <button type="submit">Log In</button>
          </form>
        </div>
      );
    }
  }
}

export default App;
