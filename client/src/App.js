import React, { Component } from "react";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";

const url = "http://localhost:3300";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    };
  }

  authenticate = () => {
    const token = window.localStorage.getItem("secret_data");
    const options = {
      headers: {
        authentication: token
      }
    };
    if (token) {
      axios
        .get(`${url}/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
          <h2>Users</h2>
          <ol>
            {this.state.users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ol>
        </section>
      </div>
    );
  }
}

export default App;
