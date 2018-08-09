import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SignIn from './components/SignIn';
import UsersList from './components/UsersList';

class App extends Component {
  
	

	
   render() {
    return (
      <div className="App">
	  <div>  
	  <h1>Welcome</h1><br />  
     	<Route exact path="/" component={SignIn} /> 
	<Route exact path="/users" component={UsersList} />
	    </div>    
      </div>
    );
  }

}

export default App;
