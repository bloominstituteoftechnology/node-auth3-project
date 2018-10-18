import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import Signup from "./components/auth/signup";
import Signin from "./components/auth/signin";
import Users from "./components/users/users";


const Home = props => {
  return (
    <div>
      <h1>Home </h1>
    </div>
  );
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false
    };
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Signup</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Signin</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.signout}>Signout</button>
          </nav>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/users" component={Users} />
            
          </main>
        </header>
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push("/signin");
  };
}

export default App;
