import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:8000/api/users', requestOptions)
            .then(res => {
                console.log("res Users", res)
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.error("Axios Failed")
            })
    }

    logoutHandler = (e) => {
        localStorage.removeItem('jwt')
    
        this.props.history.push('/signin')
      }

    render() {
    return (
        <div className="Users">
           <ul>
               {this.state.users.map(user => <li key={user.id}>{user.userName}</li>)}
           </ul>
           <div><button onClick={this.logoutHandler}>Logout</button></div>
        </div>
    );
  }
}

export default Users;
