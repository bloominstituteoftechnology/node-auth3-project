import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Home from './components/Home.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import DisplayUsers from './components/DisplayUsers.js';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={(props)=><Home {...props}/>}/>
        <Route path="/signin" component={(props)=><SignIn {...props}/>}/>
        <Route path="/signup" component={(props)=><SignUp {...props}/>}/>
        <Route path="/users" component={(props)=><DisplayUsers {...props}/>}/>
      </div>
    );
  }
}

export default App;
