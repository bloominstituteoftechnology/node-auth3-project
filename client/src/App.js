import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('http://localhost:8000/api/users')
      .then(response => {
        console.log(response.data);
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='App'>
        <h1>test</h1>

        {this.state.users.map(user => {
          return (
            <div className='users'>
              <h3>{user.username}</h3>
              <h3>{user.password}</h3>
              <h3>{user.roles}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
