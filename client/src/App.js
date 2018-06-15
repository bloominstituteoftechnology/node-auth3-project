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
          <h1 className="App-title">FELLOWSHIP OF THE RING DATABASE:</h1>
        </header>
        <div className="portal-box">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
          <button onClick={this.logout}>Logout</button>
        </div>
        <Route exact path ="/" />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
