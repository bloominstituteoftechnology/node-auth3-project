import React, { Component } from 'react';

import axios from 'axios';

import '../styles/users.css';

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

      logoutHandler = event => {
        localStorage.removeItem('jwt');
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
        <div>
            <h1>Users</h1>
            <div className="users">
            
                {this.state.users.map(user => {
                    return (
                        <div className='userbox' key={user.id}>
                            <div className='user'>User: {user.username}</div>
                            <div className='department'>Department: {user.department}</div>
                        </div>
                    )
                })}
            </div>
            <button className='logout' onClick={this.logoutHandler}>Logout</button>
        </div>
         );
    }
}
 
export default Users;