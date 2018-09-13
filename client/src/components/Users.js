import React, { Component } from 'react';
import axios from 'axios';

import styles from './users.module.css';

export default class extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/api/users',
      headers: {
        authorization: `Bearer ${this.props.token}`,
      },
    })
      .then(response => {
        // console.log(response.data);
        if (!response.data.error) {
          this.setState({ users: response.data.users });
        } else {
          this.props.invalidateLogin();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Users{' '}
          {this.state.users[0] &&
            `in ${this.state.users[0].department} department`}
        </h1>
        {this.state.users.map(user => (
          <div className={styles.user} key={user.username}>
            <div className={styles.userskew}>
              <div className={styles.username}>{user.username}</div>
              <div className={styles.department}>{user.department}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
