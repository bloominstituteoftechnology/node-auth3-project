import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>

        <Route path="/signin" component={(props)=><SignIn {...props}/>}/>
        <Route path="/signin" component={(props)=><SignUp {...props}/>}/>
      </div>
    );
  }
}

export default App;
