import React, { Component } from 'react';
import axios from "axios";
import { withRouter, Route, NavLink, Switch} from "react-router-dom"
import Register from "./Components/Register";
import Login from "./Components/Login";

const URL = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: [],
    }
  }

  authenticate = () => {
    const token = localStorage.getItem("secret_bitcoin_token");
    const options = {
      headers: {
        authorization: token
      },
    }
  
    if (token) {
      axios.get(`${URL}/api/users`, options)
        .then(res => {
          if(res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data })
          } else {
            this.props.history.push('/signin');
          }
        })
        .catch(err => console.log(err))
    } else {
      this.props.history.push('/signin');
    }
  }
  
  signOut = e => {
    e.preventDefault();
    window.localStorage.removeItem("secret_bitcoin_token");
    this.setState({ loggedIn: false, users: [] });
    this.authenticate();
  }

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const {pathname} = this.props.location;
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
          </nav>
        </header>
        <section>
          <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
          </Switch>
        </section>
        <h2>Users</h2>
        <ol>
          {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
        </ol>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default withRouter(App);
