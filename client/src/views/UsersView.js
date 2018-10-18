import React, { Component } from 'react';
import axios from 'axios';

import Users from '../components/Users';

class UsersView extends Component {
    constructor(props) {
        super(props);
    }
        state = {
            users: [],
        };

    
        render() {
          return (
              <Users {...this.props} users={this.state.users} />
          )
      }

      componentDidMount() {
          const token = localStorage.getItem('jwt');

          const endpoint = 'http://localhost:8989/api/users';
          const options = {
              headers: {
                  Authorization: token,
              },
          };
          axios
          .get(endpoint, options)
          .then(res => {
              console.log(res.data);
              this.setState({ users: res.data.users });
          })
          .catch(err => {
              console.error('ERROR', err);
          });
      }
    }
    
    export default Users;