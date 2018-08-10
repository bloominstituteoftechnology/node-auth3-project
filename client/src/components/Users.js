import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {
  state = {
    users: [],
    currentUser: {}
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')
    // const currentUser = localStorage.getItem('user').JSON()
    const requestOptions = { headers: { authorization: token } }
    axios
      .get('http://localhost:8000/api/users', requestOptions)
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { users, currentUser } = this.state
    const { history } = this.props
    const dptUsers = users.map(user => user.department === currentUser.department)
    return (
      <div className='Users'>
        {localStorage.getItem('jwt') ? (
          <div>
            <button onClick={this.handleButtonClick}>Logout</button>
            <ul>
              {users.map(user => <li key={user.id}>{user.username}</li>)}
            </ul>
          </div>
        ) : (
            <h2>
              Route access is restricted. Redirecting to /signin route
              {setTimeout(() => history.push('/signin'), 3000)}
            </h2>
          )}
      </div>
    )
  }

  handleButtonClick = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin')
  }
}

export default Users
