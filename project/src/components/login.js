import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/login.css';

class Signin extends Component {
    constructor(props) {
        super();
        this.state = { 
            username:'',
            password:'',
            department:''
         }
    }

    logIn = event => {
        event.preventDefault();
        const login = { username: this.state.username, password:this.state.password, department:this.state.department}
      axios
          .post('http://localhost:3300/api/login', login)
          .then((response) => {
            const token = response.data;
            localStorage.setItem('jwt', token);
            this.props.history.push('/users')
            
          })
          .catch(err => console.log(err));



        //   this.setState({
        //       username:'',
        //       password:'',
        //       department:''
        //   });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    };

    render() { 
        return ( 
        <div className='container'>
        <div className='topsign'>
            <h1>Sign In</h1>
            <div>
            
            <form onSubmit={this.logIn}>
              <input
                onChange={this.handleInputChange}
                placeholder="username"
                value={this.state.username}
                name="username"
                type="text"
              />
              <input
                onChange={this.handleInputChange}
                placeholder="password"
                value={this.state.password}
                name="password"
                type="password"
              />
              {/* <input
                onChange={this.handleInputChange}
                placeholder="department"
                value={this.state.department}
                name="department"
                type="text"
              /> */}
              
              <button className='submit' type="submit">Login</button>
              
            </form>

            </div>
        </div>
        </div>
         );
    }
}




 
export default Signin;

