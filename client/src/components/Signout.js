import React, { Component } from 'react'
import axios from 'axios'

class Signout extends Component {
  constructor () {
    super()
  }

  handleOnClick = () => {
    // we just have to clear jwt on the client side
    // localStorage.removeItem('jwt')

    // another approach could be replacing using fake token
    axios.get('http://localhost:3300/api/signout')
      .then(res => {
        localStorage.setItem('jwt', res.data)
        this.props.history.push('/signin')
      })
      .catch(error => console.error(error))
  }

  render () {
    return (
      <div>
        <button onClick={this.handleOnClick}>Sign out</button>
      </div>
    )
  }
}

export default Signout