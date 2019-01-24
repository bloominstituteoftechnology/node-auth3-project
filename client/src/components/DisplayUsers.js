import React, { Component } from 'react';
import axios from 'axios';

class DisplayUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    const options = {
      headers:{
        Authorization: localStorage.getItem('jwt')
      }
    }
    axios.get('http://localhost:3300/api/users', options)
    .then(res=>{
      this.setState({
        users: res.data
      })
    })
    .catch(error=>{
      console.log(error);
    })
  }

  render() {
    return (
      <div>
          Users
          {this.state.users.map(user=>(
            <div key={user.id}>
              <div>{user.username}</div>
              <div>{user.department}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default DisplayUsers;