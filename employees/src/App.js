import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn'
import UserList from './components/Users/UserList'
import './App.css';
import {Route} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
state={
  currentUser: '',
  users: []
}

      componentDidMount() {
        const token = localStorage.getItem('token');
        const requestOptions = {
          headers: {
            Authorization: token
          }
        }
        axios
          .get('http://localhost:8000/api/users', requestOptions)
          .then(response => {
            console.log('userlist_response', response)
            this.setState({
              currentUser: response.data.currentUser,
              users: response.data.users
            })

          })
      }



  render() {
    return (
      <div className="App">
        <header className="App-header">
   
          <h1 className="App-title">Welcome, {this.state.currentUser}</h1>
        </header>


        <Route path='/signin' component={SignIn}/>

         <Route path='/users' render={(props)=>{
          return <UserList users = {this.state.users} />
         }}/>
        
      </div>
    );
  }
}

export default App;
