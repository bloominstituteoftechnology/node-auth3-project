import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from "./components/SignIn";
import UserList from "./components/UserList";
import {Link, NavLink, Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';


class App extends Component {
  state = {
    username: '',
    password: '',
    department: ''
  }

  inputHandler = (e) =>{
    
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit = () => {
    let user = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    }
    
    
    axios.post('http://localhost:8888/api/register', user)
         .then(res => {
          this.setState({
      
            username: '',
            password: '',
            department: ''
          
        })
    })
         .catch(err => console.log(err))
    
  }
  googleSubmit = () => {
    const params = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers": "X-Requested-With,content-type",
          "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
      data: undefined
  }
    
    
    axios.post('http://localhost:8888/signin/google', params)
         .then(res => {
          console.log('google submit:', res)
        })
         .catch(err => console.dir(err))
    
  }
  login = () => {
    let user = {
      username: this.state.username,
      password: this.state.password,
    }
    
    
    axios.post('http://localhost:8888/api/login', user)
         .then(res => { console.log(res);
                        localStorage.setItem('jwt', res.data.token);
                        this.setState({
      
                          username: '',
                          password: ''
                        
                      })
                      })
         .catch(err => console.log(err))
    
         
  }

  logout = () => {
    localStorage.removeItem('jwt');
  }



  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <nav>
            <div className="navholder">

              <div className="nav-item">
                <Link to="/signup">Sign Up</Link>
              </div>
              <div className="nav-item">
                <Link to="/login">Login</Link>
              </div>
              <div className="nav-item">
                <Link to="/users">Users</Link>
              </div> 
              <div className="nav-item" onClick={this.logout}>
                <Link to="/">Log Out</Link>
              </div> 

            </div>
          </nav>
        </header>
        <Switch>
          <Route  exact path='/signup' render={props => <SignUp username={this.state.username} 
                                                                password={this.state.password} 
                                                                department={this.state.department}
                                                                inputHandler={this.inputHandler}
                                                                submit={this.submit}
                                                                />}
                                                                />
          <Route path="/login" render={props => <SignIn username={this.state.username} 
                                                        password={this.state.password} 
                                                        inputHandler={this.inputHandler}
                                                        login={this.login}
                                                                 /> }/>
          <Route path="/users" render={props => <UserList />} />
        </Switch>
        <a href="http://localhost:8888/signin/google">
          <div className="btn">Login w/ google</div>
        </a>

      </div>
    );
  }
}

export default withRouter(App);
