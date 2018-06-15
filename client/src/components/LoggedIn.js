import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

// axios.interceptors.request.use((config)=>{  
//   const token = localStorage.getItem("token");
//   config.headers.Authorization = token;
//   return config;
// })

export default class LoggedIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  
  componentDidMount(){
            
    axios
      .get('http://localhost:5500/api/users', {
        headers: { "authorization": localStorage.getItem('token')}
      })
        .then(response => {
          console.log(response)
          this.setState({
            users: response.data
          })
        })
      
  }
  signout = () => {
    localStorage.removeItem('token');
    this.props.stateOut();
  }

  render() {
    return (
      <div>
        <button onClick={this.signout}>SignOut</button>
        <h1>  LOGGED IN </h1>
        <div>
        <List component="nav"> 
        {this.state.users.map(user => {
          return (              
           
            <ListItem key={user._id} button>
              <ListItemText primary={`user = ${user.username} and race = ${user.race}`} />  
            </ListItem>    
                
            
          )
        })}
        </List>
        </div>
      </div>
    )
  }
};

