import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {
  state = {
    users: []
  }

  componentDidMount () {
    const token = localStorage.getItem('jwt')
    const requestOptions = { headers: { authorization: token } }
    axios
      .get('http://localhost:8000/api/users', requestOptions)
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <ul>
        {this.state.users.map(user => {
          return <li key={user.id}>{user.username}</li>
        })}
      </ul>
    )
  }
}

export default Users
