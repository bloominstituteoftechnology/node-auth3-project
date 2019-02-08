import React from 'react'
import axios from 'axios'

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const endpoint = `http://localhost:3300/api/login`
    axios.post(endpoint, this.state) 
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input 
            name='username'
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input 
            name='password'
            type="text"
            value={this.state.password}
            onChange={this.handleInputChange}/>
        </div>
        <div>
          <button type='submit'>Signin</button>
        </div>
      </form>
    );
  }
}

export default Signin;