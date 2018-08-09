import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [],
         }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const requestOptions = { headers: { authorization: token } };
        axios
          .get(`http://localhost:8002/users`, requestOptions)
          .then(response => this.setState({ users: response.data }))
          .catch(err => console.log(err));
    }

    logoutHandler = e =>{
        localStorage.removeItem('token');
        this.props.history.push('/signin');
      }

    render() {
        if(!this.state.users) {
            return <div>Loading users info</div>
        } 
        return (
            <div>
                <ul> 
                    {this.state.users.map(user => {
                    return <li key={user.id}>{user.username}: {user.department}</li>
                    })}    
                </ul>
                { localStorage.getItem('token') && (<button onClick={this.logoutHandler}>Logout</button>)}
            </div>
         );
    }
}
 



export default Users;