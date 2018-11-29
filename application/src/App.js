import React, { Component } from 'react';
import axios from 'axios';
import {withRouter,Switch,NavLink,Route} from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import SignOut from './components/SignOut'

const url = 'http://localhost:9000';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    }
  }

  authenticate = () => {

    const token = localStorage.getItem('Token');

    const options = {
      headers: {
        Authorization: token
      },
    };

    if (token) {
      axios.get(`${url}/api/users`, options)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          }
          else {
            throw new Error();
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      console.log("there was an error")
    }
  }

  componentDidMount(){
    this.authenticate();
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/sign-out">Sign Out</NavLink>
        </nav>
        <section>
          {/* <p>Token {localStorage.getItem('Token')}</p> // This was for testing purposes*/}
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/sign-out" component={SignOut} />
            <Route path="/" render={() => {
              return (
                <React.Fragment>
                <h2>Users and Departments : </h2>
                  <ol>
                    {this.state.users.map(user => <li key={user.id}>Username: {user.username} <br /> Dept : {user.department}</li>)}
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

export default App;
