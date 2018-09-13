import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'; 
import axios from 'axios'; 


class ShowUsers extends React.Component {
  state = {
    username : null, 
    users : [],
  }

  componentWillMount() {
    const promise = axios.get('http://localhost:9000/api/users')
    promise
      .then(response => {
        console.log(response)
        this.setState({users: response.data, username: "someone"})
      })
      .catch(error => {
        console.error(error,error.message) 
      })
  }

  fetchUsers = () => {
    const promise = axios.get('http://localhost:9000/api/users')
    promise
      .then(response => {
        console.log(response)
        this.setState({users: response.data, username: "someone"})
      })
      .catch(error => {
        console.log(error,error.message) 
    })
  }

  render(){
    console.log(this.state)
    if(this.state.users.length){
      const users = this.state.users.slice()
      return (
        <div>
          {users.map((user, i) => {
            return (<div key = {i + 100}>
              <h3 key = {i}>{user.username}</h3>
              <h4 key = {i + 10}>{user.department}</h4>
            </div>)
          })}
        </div>
      )
    } else {
        return (
          <div>
            <h1>Users Page</h1>
            <button onClick = {this.fetchUsers}>Get users</button>
          </div>  
        )
    }
  }
}

export default withRouter(ShowUsers); 