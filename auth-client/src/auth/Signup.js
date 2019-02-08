import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: ''
    }
  }

  handleInputChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const endpoint = `http://localhost:3300/api/register`
    axios.post(endpoint, this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users')
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  render() { 
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="">Username</label>
            <input
            name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"/>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
            name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"/>
          </div>
          <div>
            <label htmlFor="">Department</label>
            <input
              name='department'
              value={this.state.department}
              onChange={this.handleInputChange}
              type="text"/>
          </div>
          <div>
            <button type='submit'>Signup</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;