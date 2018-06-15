import React, { Component } from 'react';
import './App.css';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import { SignUp, SignIn, Users, Ring } from './cmpnts'

class App extends Component {

  logout = () => {
    if(localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="portal-box">
            <Link to="/">
              <button className="button-template">Home</button>
            </Link>
            <Link to="/signup">
              <button className="button-template">Sign Up</button>
            </Link>
            <Link to="/signin">
              <button className="button-template">Sign In</button>
            </Link>
            <button className="button-template" onClick={this.logout}>Logout</button>
          </div>
        </header>
        <Switch>
          <Route exact path ="/" />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/users" component={Users} />
          <Route component={Ring}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
