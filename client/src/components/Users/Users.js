import React, { Component } from 'react';
import axios from 'axios';
import SignOut from '../SignOut/SignOut';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    const config = {
      headers: {
        'Authorization': localStorage.authiiToken
      }
    };
    axios.get('http://localhost:5500/api/users', config)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        // TO DO: On redirect to sign in page display message telling user they must log in before accessing content
        this.props.history.push('/');
      });
  }
  render() { 
    return (
      <div>
        <SignOut history={this.props.history} />
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.username}>
                <div>
                  <h2>{user.username}</h2>
                  <p>{user.race}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
 
export default Users;