import React from 'react';
import axios from 'axios';
import { withRouter } from'react-router-dom';

class Register extends React.Component{
  state = {
    user:"",
    password:"",
    department:""
  }
  render(){
    return(
      <div>
      <h2>Register</h2>
      <form onSubmit={this.handleSubmit}>
      <div>
        <div>
          <label htmlFor="user"/>
          <input
            name="user"
            id="user"
            value={this.state.user}
            onChange={this.handleInputChange}
            type="text"
            placeholder="Username"
            />
        </div>
        <div>
          <label htmlFor="password"/>
          <input
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
            />
          </div>
          <div>
          <label htmlFor="department"/>
          <input
            name="department"
            id="department"
            value={this.state.department}
            onChange={this.handleInputChange}
            type="text"
            placeholder="department"
            />
          </div>
      </div>
      <button type="submit">Sign Up</button>
      </form>
      </div>
    )
  }
  handleInputChange = e =>{
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = e =>{
    e.preventDefault();
    const endpoint = 'http://localhost:8000/api/user/register'
    axios
      .post(endpoint, this.state)
      .then(res =>{
        console.log('response data',res.data)
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/login')
      }).catch(e =>{
        console.log(e)
      })
  }
}
export default withRouter(Register);