import React, { Component } from 'react';
import '../App.css';
import '../index.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from "axios";
//axios.defaults.withCredentials = true

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: []
    }
  }

  componentDidMount = () => {
    // axios
    //   .get(`http://localhost:8000/`)
    //   .then(res => {
    //     console.log('authorized', res)
    //   })
    //   .catch(err => console.log('Unauthorized', err))
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: token
      }
    }
    console.log('requestOptions', localStorage.getItem('token'))
    axios
      .get(`http://localhost:8000/api/users`, requestOptions)
      .then(res => {
        console.log('res', res)
        this.setState({
          usernames: res.data
        })
      })
      .catch(err => this.props.history.push('/login'))
  }

  handleLogout = id => {
    //const URL = 'http://localhost:3000/'
    axios
      .get(`http://localhost:8000/api/logout`)
      //.then(response => window.location.href = URL)
      .then(response => console.log('logout response', response))
      .catch(error => console.log('logout error', error))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <h4>Users:</h4>
          {this.state.usernames.map(user =>
            <div>
              <div key={user.id}>
                <div className="card-body">
                  <h5 className="card-title py-0">{user.username}</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;