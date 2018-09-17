import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    const token = localStorage.getItem('jwt')
    // get users from database
    axios.get('http://localhost:3300/api/users', {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(error => {
        console.error(error)
        this.props.history.push('/signin')
      })
  } 

  render () {
    return (
      <div>
        { this.state.users.length !== 0 
            ? this.state.users.map(user => {
              return (
                <ul key={user.id}>
                  <li>{user.username}</li>
                  <li>{user.department}</li>
                </ul>
              )
            })
            : <div></div>
        }
      </div>
    )
  }
}

export default Users