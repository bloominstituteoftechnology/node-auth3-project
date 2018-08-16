import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SignIn from './components/SignIn';
import UsersList from './components/UsersList';
import Register from './components/Register';
import Home from './components/Home';

class App extends Component {
  
	

	
   render() {
    return (
      <div className="App">
	<div>  
		<Route exact path="/" component ={Home} />
	    	<Route exact path="/login" component={SignIn} /><br /><br />   
		<Route exact path="/register" component={Register} />
		<Route exact path="/users" component={UsersList} />
	   </div>    
      </div>
    );
  }

}

export default App;
