import React from "react";
import "./App.css";
import LoginForm from "./Forms/LoginForm"
import SignUpForm from "./Forms/SignupForm";





import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



import PrivateRoute from "./util/PrivateRoute";


import Users from "./Forms/Users"



function App(props) {
  return (
    <div className='App'>
     
      
      
      
      <Router>

      
        <Switch>
          {/* Will use /:id instead of 'card' */}
 
          <PrivateRoute path='/users' component={Users} />
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/signup' component={SignUpForm} />
          <Route path='/logout' component={() => { 
     window.location.href = 'http://localhost:4000/api/auth/logout'; 
     return null;
}}/>
        </Switch>
       
      </Router>
    </div>
  );
}


export default App;
