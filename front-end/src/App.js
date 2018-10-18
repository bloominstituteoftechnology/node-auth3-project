import React, { Component } from 'react';  
import './App.css';
import {Route} from 'react-router';
import RegistrationForm from './components/registrationForm';
import LoginForm from './components/loginForm';
import Users from './components/users';

class App extends Component {
  
signout = () => {
  localStorage.removeItem('jwt');
  window.location.reload();
}


  render() {
    return (
      <div className="App">
        <Route path="/signup" 
        render={ props => ( 
          <RegistrationForm  {...props}/>
          )}
          />
        <Route path="/signin" 
        render={ props => ( 
          <LoginForm  {...props}/>
          )}
          />
        <Route path="/users"
        render={ props => ( 
          <Users  {...props} signout={this.signout} />
          )}
          />
      </div>
    );
  }
}

export default App;
