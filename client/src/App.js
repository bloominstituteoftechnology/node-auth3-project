import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import LoggedIn from './components/LoggedIn';
import Header from './components/Header';
import { Route } from 'react-router-dom'
import axios from 'axios';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }
  
  componentDidMount = () => {
    //   axios.interceptors.request.use((config)=>{  
    //     const token = localStorage.getItem("token");
    //     config.headers.Authorization = token;
    //     return config;
    // }) 
    this.fetch();
  }

  fetch = () => {
    axios
      .get('http://localhost:5500/api/users', {
        headers: { "authorization": localStorage.getItem('token')}
      })
        .then(response => {
          console.log(response)
          if(response.data){
            this.setState({
              isSignedIn: true
            })
          }
        })
        .catch(err => {
          console.log(err.message)
        })
  }

  loginHandler = (loginBool) =>{
    if(loginBool === 'Logged In'){
      this.setState({
        isSignedIn: true,
      })
    }
  }

  logOut = () =>{
    this.setState({
      isSignedIn: false,
    })
  }
  

  render() {

    return (
      <div>
        <Header />
        <Route path="/login" render={(props) => <SignIn loginHandler={this.loginHandler} {...props}/>} />
        <Route path="/register" render={(props) => <SignIn loginHandler={this.loginHandler} {...props}/>} />
        <Route path="/loggedin" render={(props) => <LoggedIn stateOut={this.logOut} {...props}/>} />
        
        {/* {this.state.isSignedIn
      ?
        <LoggedIn stateOut={this.logOut}/>
      :
        <div className="App">
          <SignIn loginHandler={this.loginHandler}/>        
        </div>   
      } */}
      </div>
    )


  //   if(this.state.isSignedIn){
  //     return (
  //       <LoggedIn/>        
  //     );
  //   }
  //   else{
  //    return (
  //    <div className="App">
  //         <div className="App">
  //           <SignIn loginHandler={this.loginHandler}/>        
  //         </div>   
  //     </div>)
  //   }
    
  }
}

export default App;
