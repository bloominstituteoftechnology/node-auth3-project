import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import {NavLink, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const url = "http://localhost:3800";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    };
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
  };

  authenticate = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        authorization: token
      }
    };
    console.log("token", token);
    if (token) {
      axios
        .get(`${url}/api/users`, options)
        .then(res => {
          console.log(res.data);
          this.setState({loggedIn: true, users: res.data});
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount = () => {
    this.authenticate();
  };

  render() {
    return (
      <div className="App">
        <header>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          {/* <NavLink></NavLink> */}
        </header>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

            {this.state.loggedIn ? (
              <button onClick={this.handleLogout}>Log Out</button>
            ) : null}
          </Switch>
          {this.state.loggedIn
            ? this.state.users.map(user => <h4>{user.username}</h4>)
            : null}
          {/* {this.state.users.map(user => (
            <h4>{user}</h4>
          ))} */}
        </section>
      </div>
    );
  }
}

export default App;
