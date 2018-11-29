import React from 'react';
import UsersList from './components/UsersList'
import {Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App =()=>{
  
    return (
      <div>
        <Route path ='/' component={SignUp}></Route>
        <Route path='/' component={UsersList}></Route>
        <Route path ='/' component={SignIn}></Route>
        
      </div>
    );
  }


export default App;
