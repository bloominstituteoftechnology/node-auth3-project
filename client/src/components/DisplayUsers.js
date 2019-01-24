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
        Authorization: localStorage.getItem('jwt'),
        Xdepartment: localStorage.getItem('department')
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

  returnHome = (event)=>{
    event.preventDefault();
    this.props.history.push('/');
  }

  logout = (event)=>{
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('department');
    this.props.history.push('/');
  }

  render() {
    if(!this.state.users.length){
      return (
        <div>
          <div onClick={this.returnHome}>Home</div>
          <h1>Users</h1>
          <p>You are not authorized to view the users</p>
        </div>
      )
    }
    return (
      <div>
        <div onClick={this.returnHome}>Home</div>
        <div onClick={this.logout}>Logout</div>
        <h1>Users</h1>
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