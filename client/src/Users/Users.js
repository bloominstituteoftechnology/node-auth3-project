import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class Users extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')
    const endpoint = 'http://localhost:9000/api/users'
    const options = {
      headers: {
        Authorization: token,
      }
    }
    axios
      .get(endpoint, options)
      .then(res => {
        this.setState({ users: res.data.users })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>User List</h1>
        <Ul1>
          {this.state.users.map(users => (
            <Li1 key={users.id}>{users.username}</Li1>
          ))}
        </Ul1>
      </div>
    )
  }
}

const Ul1 = styled.ul`
  list-style-type: none;
`
const Li1 = styled.li`
  font-size: 1.6rem;
`

export default Users