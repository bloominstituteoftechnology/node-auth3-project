import React, { Component } from 'react';
import axios from 'axios';

class UsersView extends Component {
    constructor(props) {
        super(props);
    }
        state = {
            users: [],
        };

    
        render() {
            return (
                <div>
                    <h2>List of users</h2>
                    <ul>
                        {this.state.users.map(u => (
                            <li key={u.id}>{u.username}</li>
                        ))}
                    </ul>
               </div>
             );
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
    
    export default UsersView;