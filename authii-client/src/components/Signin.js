import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = event =>{
    event.preventDefault();
    const endpoint = "http://localhost:4000/api/login"

    //register the user
    axios.post(endpoint, this.state)
      .then(res =>{
        //store token in browser local storage
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
        console.log(res.data)
      })
      .catch(err =>{
        console.log('ERROR', err);
      })
  }

  handleChange = event =>{
    const {name, value} =  event.target;
    this.setState({
      [name]: value
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="username" required
              value={this.state.username} name="username" onChange={this.handleChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required
              value={this.state.password} onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }


}

export default Signin;