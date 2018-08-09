import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SignIn from './components/SignIn';


class App extends Component {
  
	

	
   render() {
    return (
      <div className="App">
	  <div>  
	  <h1>Welcome</h1><br />  
	 <Link to="/login">Login</Link><br /><br /> 
     	<Route exact path="/login" component={SignIn} /> 
	</div>    
      </div>
    );
  }

}

export default App;
