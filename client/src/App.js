import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Register from './components/Register';
import Login from './components/Login';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: []
    };
  }
  authenticate = () => {
    const token = localStorage.getItem('secret_bitcoin_token');
    const options = {
      headers: {
        authenticate: token
      }
    };
    if (token) {
      axios.get('http://localhost:9000/users', options)
      .then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ loggedIn: true, users: res.data })
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.props.history.push('/login');
      })
    } else {
      this.props.history.push('/login');
    }
  }
  componentDidMount() {
    this.authenticate();
  }
  
  render() {
    return (
      <div className="App">
       <section>
         <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' render={ () => {
            return (
              <section>
                <h2>Users</h2>
                <div>
                  {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                </div>
              </section>
            )
          }} />
        </Switch>
       </section>
      </div>
    );
  }
}

export default  withRouter(App);
