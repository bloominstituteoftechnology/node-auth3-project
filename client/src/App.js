import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import LoggedIn from './components/LoggedIn';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }
  
  componentDidMount = () => {
      axios.interceptors.request.use((config)=>{  
        const token = localStorage.getItem("token");
        config.headers.Authorization = token;
        return config;
    }) 
    this.fetch();
  }

  fetch = () => {
    axios
      .get('http://localhost:5500/api/users')
        .then(response => {
          console.log(response.data)
          if(response.data){
            this.setState({
              isSignedIn: true
            })
          }
        })
  }

  loginHandler = (loginBool) =>{
    if(loginBool === 'Logged In'){
      this.setState({
        isSignedIn: true,
      })
    }
  }

  

  render() {
    if(this.state.isSignedIn){
      return (
        <LoggedIn/>        
      );
    }
    else{
     return (
     <div className="App">
          <div className="App">
            <SignIn loginHandler={this.loginHandler}/>        
          </div>   
      </div>)
    }
    
  }
}

export default App;
