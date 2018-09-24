import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component {
  state = {
    users: [ ],
  };

  render() {
    return (
      <div >
        <ul>
          {this.state.map(user) => (
            <li key = {user.id}>{user.username}</li>
          )}
        </ul>
      </div>
    )
  }
}
