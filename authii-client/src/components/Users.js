import React from 'react';
import axios from 'axios';

class Users extends React.Component{
  constructor(props){
    super(props)
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

  signout = () => {
    //Remove token from localStorage and direct user to signin page
    localStorage.removeItem('jwt');
    this.props.history.push('/signin')
    window.location.reload();
  }
  
  render(){

    return (
      <div>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>Username:{user.username}&nbsp;&nbsp;Department:{user.department}</li>
          )}
        </ul>
        <button onClick={this.signout}>Sign-out</button>
        
      </div>
    )
  }
}

export default Users;