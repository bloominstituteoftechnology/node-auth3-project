import React, { Component } from 'react';
import axios from 'axios';
import '../styles/register.css';
// axios.defaults.withCredentials = true;


class Signup extends Component {
    constructor(props) {
        super();
        this.state = { 
            username:'',
            password:'',
            department:''
         }
    }    
      
      postUser = event => {
          event.preventDefault();
          const adduser = { username: this.state.username, password:this.state.password, department:this.state.department}
        axios
            .post('http://localhost:3300/api/register', adduser)
            .then((response) => {
              const token = response.data;
              localStorage.setItem('jwt', token);
              this.props.history.push('/users')
            })
            .catch(err => console.log(err));



            this.setState({
                username:'',
                password:'',
                department:''
            });
      }

      handleInputChange = e => {
          this.setState({ [e.target.name]: e.target.value});
      };

    render() { 
        return ( 
          <div className='container'>
          <div className='containertwo'>
            <h1>Register User</h1>
            <div className="userform">
            <form onSubmit={this.postUser}>
              <input
                onChange={this.handleInputChange}
                placeholder="username"
                value={this.state.username}
                name="username"
              />
              <input
                onChange={this.handleInputChange}
                placeholder="create password"
                value={this.state.password}
                name="password"
              />
              <input
                onChange={this.handleInputChange}
                placeholder="department"
                value={this.state.department}
                name="department"
              />
              <button type="submit">Create User</button>
            </form>
          </div>
          </div>
          </div>
            
            
        )
    }
}
    

 
export default Signup;