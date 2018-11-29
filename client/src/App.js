import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

//environmental variables
const url = process.env.REACT_APP_API_URL;

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: [],
    };
}
authenticate = () => {
  const token = localStorage.getItem('unicorn_token');
  //options object, with axios, is how you send in/modify token
  const options = {
    //what we were doing manually in postman
    headers: {
      authentication: token,
    },
  };
  if (token) {
    axios.get(`${url}/api/restricted/users`, options)
    //url environmental variable
      .then((res) => {
        if (res.status === 200 && res.data) {
          this.setState({ loggedIn: true, users: res.data });
        }
        
        else {
          console.log('hi')
          throw new Error();
        }
      })
      .catch((err) => {
        //history.push is coming from react-router library
        this.props.history.push('/login');
        
      });
  } else {
    this.props.history.push('/login');
}
}
componentDidMount() {
  this.authenticate();
  //whenever we authenticate it updates our state
}
componentDidUpdate(prevProps) {
  //how app knows something has changed
  const { pathname } = this.props.location;
  console.log(this.props);
  console.log(prevProps);
  if (pathname === '/' && pathname !== prevProps.location.pathname) {
    this.authenticate();
  }
}
render() {
return (
  //<SWITCH> Only the first child to match the current location will be rendered.
  //<REACT.FRAGMENT> Fragments let you group a list of children without adding extra nodes to the DOM.
  //... using fragments results in a correct <Table /> output 

  <div className="App">
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
    <section> 
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" render={() => {
          return (
            <React.Fragment>
            <h2>Users</h2>
              <ol>
                {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
              </ol>
            </React.Fragment>
          );
        }} />
      </Switch>
      
    </section>
  </div>
);
}
}

export default withRouter(App);
