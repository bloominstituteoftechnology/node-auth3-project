import React, { Component } from 'react';
import ring from './oneringGIF.gif';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom';
import { SignUp, SignIn, Users } from './cmpnts'

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
          <img src={ring} className="ring-logo" alt="logo" />
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
        <Route exact path ="/" />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
