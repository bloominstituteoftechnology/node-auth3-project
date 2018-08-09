import React, { Component } from 'react';
import '../App.css';
import '../index.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from "axios";
axios.defaults.withCredentials = true

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: []
    }
  }

  componentDidMount = () => {
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