import React, { Component } from 'react';
import Axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import UsersList from './components/userComponents/UsersList';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor() {
    super();
    // this.handleInputChange = this.handleInputChange.bind(this); Don't need this since reformatting to ES6 functions 
    this.state = {
      users:[],
      username:'',
      password:'',
      department:'',
      loggedIn: false
    }
  }
  handleLogin = e => {
    e.preventDefault();
    Axios
      .post(`${url}/api/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if(response.status === 200 && response.data){
          localStorage.setItem('BANK CODE', response.data)
          this.setState({ loggedIn: true });
          this.fetchUsers();
        }
      })
      .catch(error => console.log(error));
    this.setState({
      username: '',
      password: ''
    });
    this.props.history.push('/users')
  }
  handleLogout = e => {
    e.preventDefault();
    if (this.state.loggedIn){
      localStorage.getItem('BANK CODE');
      this.props.history.push('/login');
      this.setState({ loggedIn: true });
    } 
  }
  handleRegister = e => {
    e.preventDefault();
    if(this.state.username && this.state.password && this.state.department){
      Axios
        .post(`${url}/api/register`, {
          username: this.state.username,
          password: this.state.password,
          department: this.state.department
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
      this.setState({
        username: '',
        password: ''
      });
      this.props.history.push('/login')
    }
    
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchUsers = () => {
    const token = localStorage.getItem('BANK CODE');
    const options = {
      headers: {
        authentication: token
      },
    }
    if (this.state.loggedIn && token){
      Axios
      .get(`${url}/api/users`, options)
      .then(response => this.setState({ users: response.data }))
      .catch(err => {console.log(err)});
    }else{
      console.log('this crap aint mounting')
    }    
  }
  componentDidMount() {
    this.fetchUsers();
  }
  
  render() {
    if(!this.state.loggedIn){
      return (
        <div className='container'> 
          <div className='nav-bar'>
            <NavLink to='/' >HOME</NavLink>
            <NavLink to='/login' >LOGIN</NavLink>
            <NavLink to='/register' >REGISTER</NavLink>
          </div>
          <Route path='/login' render={(props) => 
            <LoginForm 
            className='login-form'
              username={this.state.username} 
              password={this.state.password}         
              handleChange={this.handleInputChange}
              login={this.handleLogin} 
            />
          }/>
          
          <Route path='/register' render={(props) => 
            <RegisterForm 
              className='register-form'
              username={this.state.username} 
              password={this.state.password}
              department={this.state.department}         
              handleChange={this.handleInputChange}
              register={this.handleRegister}  
            />
          }/>
        </div> 
      )
    }
    return (
      <div className="App">
        <div className='nav-bar'>
          <NavLink to='/' >HOME</NavLink>
          <NavLink to='/login' >LOGIN</NavLink>
          <NavLink to='/register' >REGISTER</NavLink>
        </div>
        <Route path='/users' render={() => 
          <UsersList 
            users={this.state.users} 
            logout={this.handleLogout}
        /> 
        }/>
        
        
      </div>
    )
    
  }
}

export default App;
