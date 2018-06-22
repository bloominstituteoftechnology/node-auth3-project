import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Signin from './components/Signin';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">         
            <Link to="/signup">
            <button>REGISTER</button>
            </Link>
            <Link to="/signin">
            <button>SIGN IN</button>
            </Link>
            <Link to="/users">
            <button>USERS LIST</button>
            </Link>
              <Link onClick={this.signout} to ="/signout"><button>LOG OFF</button>
            </Link>
          <Route path = "/signup" component={Register} />
          <Route path = "/signin" component={Signin} />
          <Route path = "/users" component={Users} />
      
      </div>
    );
  }
  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.props.history.push('/signin');
    }
  };
}

export default App;
