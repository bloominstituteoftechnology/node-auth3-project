import React, { Component } from 'react';
import './App.css';
import SigninForm from './components/SigninForm';
import UserList from './components/UserList';
import SignupForm from './components/SignupForm';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      
      <Router>
        <div className="App">
          <Route to='/' render={() => <Redirect to ='/signin'/>}/>
          <Route path='/signin' component={SigninForm}/>
          <Route path='/users' component={UserList} />
          <Route path='/signup' component={SignupForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
