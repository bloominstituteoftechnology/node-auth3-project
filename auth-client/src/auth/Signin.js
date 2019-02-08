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
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const endpoint = `${process.env.API_URL}/api/login`
    axios.post(endpoint, this.state) 
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
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
            type="username"
            value={this.state.username}
            onChange={this.handleInputChange}/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input 
            type="password"
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