import React from 'react';
import axios from 'axios';
import requireAuth from '../auth/requireAuth';

class Users extends React.Component{
  state = {
    users:[]
  }
  render(){
    return(
      <div>
      <h2>Users</h2>
      <ul>
      {this.state.users.map(u => <li key={u.id}>{u.user}</li> )}
      </ul>
      </div>
    )
  }
  componentDidMount() {
    axios.get('/user')
      .then(res =>{
      this.setState({ users: res.data });
    }).catch(e =>{
      console.error(e);
    })
  }
}
export default requireAuth(Users);