import React, { Component } from 'react'
import UserList from './UserList';
import axios from 'axios'


class UserContainer extends Component {
    state = {
        users: []    
    }

    render(){
        const {users} = this.state
        if(!localStorage.getItem('jwt')) this.props.history.push('/login')
        return(
            <>
            <UserList users = {users}/>
            </>
        )
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt');
        const options = {
          headers: {
            loggedin: token,
          },
        };
        axios
          .get('http://localhost:4444/api/users', options)
          .then(res => {
              console.log(res.data);
            this.setState({ users: res.data });
          })
          .catch(err => {
            console.error('ERROR', err);
          });
      }
}

export default UserContainer