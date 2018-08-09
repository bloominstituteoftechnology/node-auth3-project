import React, { Component } from 'react';

import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super();
        this.state = { 
            users:[],
         }
    }

    componentDidMount() {
        
        this.getData();
        
      }
    
      
      getData = () => {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:3300/api/users', requestOptions)
            .then((response) => {
              this.setState({ users: response.data })
            })
            .catch(err => console.log(err));
      }

    render() { 
        return ( 
            
            <div className="users">
            <h1>Users</h1>
                {this.state.users.map(user => {
                    return (
                        <p key={user.id}>{user.username}{user.department}</p>
                    )
                })}
            </div>
         );
    }
}
 
export default Users;