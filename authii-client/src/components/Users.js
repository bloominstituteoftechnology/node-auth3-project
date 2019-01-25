import React from 'react';
import axios from 'axios';

class Users extends React.Component{
  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt');
    const endpoint = "http://localhost:4000/api/users";

    const options = {
      headers: {
        Authorization: token
      }
    }
    axios.get(endpoint, options)
    .then(res =>{
      console.log(res.data);
      this.setState({
        users: res.data
      })
    })
    .catch(err =>{
      console.error('ERROR', err);
    })

  }
  
  render(){

    return (
      <div>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>Username:{user.username}&nbsp;&nbsp;Department:{user.department}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default Users;