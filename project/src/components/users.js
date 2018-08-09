import React, { Component } from 'react';

import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super();
        this.state = { 
            users:[],
         }
    }

    componentWillMount() {
        this.getData();
        
      }
    
      
      getData = () => {
        axios
            .get('http://localhost:3300/api/users')
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
                        <p>{user.username}{user.department}</p>
                    )
                })}
            </div>
         );
    }
}
 
export default Users;