import React, { Component } from 'react';
import SignUp from './Components/SignUp';
import './App.css';
import Users from './Components/Users';
import Unauthorized from './Components/Unauthorized';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import { Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faChevronLeft)



class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path='/' component={Home} />
        <Route path='/api/users' component={Users} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/unauthorized' component={Unauthorized} />
      </div>
    );
  }
}

export default App;
