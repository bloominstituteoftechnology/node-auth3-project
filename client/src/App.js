import React, { Component } from 'react';
import axios from "axios";
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
// import { withRouter } from "react-router";

import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";

import './App.css';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    };
  }

  authenticate = () => {
    const token = localStorage.getItem("secretBitcoinToken");
    if (token) {
      const options = {
        headers: {
          authentication: token
        }
      };
      axios.get(`${url}/api/restricted/users`, options)
      .then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ loggedIn: true, users: res.data });
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/signin");
      });
    } else {
      this.props.history.push("/signin");
    }
  }

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === "/users" && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  logout() {
    localStorage.removeItem("secretBitcoinToken");
    window.location.reload();
    // this.history.push("/signin");
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/users">Users</NavLink>
          <div onClick={this.logout}>Logout</div>
        </nav>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
            <Route path="/users" render={props => <Users {...props} users={this.state.users} />} />
          </Switch>
          {/* <ol>
            {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
          </ol> */}
        </section>
      </div>
    );
  }
}

export default withRouter(App);
