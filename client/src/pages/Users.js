import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { loadToken } from '../utils/localStorage';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      loginState: false
    }
  }
  componentDidMount() {

    console.log("Component mounting");
    const token = this.props.token || loadToken();
    console.log("this.props.token",token);
    const axiosWithToken = axios.create({
      headers: { "Authorization": token }
    });
    axiosWithToken.get('http://localhost:5500/api/users')
      .then(res => {
        this.setState({ users: res.data, loading: false, loginState: true})
      })
      .catch(error => { 
        const code = error.response.status;
        console.log("Error status code:",code);
        if (code === 401) {
          this.setState({loginState: false, loading: false});
        }
      });
  }

  loginPlease() {
    setTimeout(() => {
      this.props.history.push('/login');
    }, 2500);
    return (
      <div className="tc">
        <h3>You are not logged in.</h3>
        <Link to='/login'>Click here to log-in.</Link>
        <p>Or feel free to wait while we take you there. Hang on!</p>
      </div>
    );
  }

  logoutPlease = () => {
    localStorage.clear();
    this.props.send('');
    this.props.history.push('/');
  }

  displayUsers = () => {
    let race = 'user';
    if (!this.state.loading) {
      race = this.state.users[0].race || 'user';
    }
    const racePlurals = {
      "man": "humans",
      "dwarf": "dwarves",
      "elf": "elves",
      "giant": "giants",
      "hobbit": "hobbits",
      "orc": "orcs",
      "user": "users",
      "yeti": "yetis"
    }
    return (
      <div>
        <h3>List of {`${racePlurals[race]}`} in Ron's Silly App</h3>
        <ul>
          {this.state.users.map(user => <li style={{"width":"20%"}}className="center tl" key={user.username}>{user.username}</li>)}
        </ul>
        <br />
        <button onClick={this.logoutPlease}>Logout</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.state.loading && <h1>Loading. Hold on!!!</h1>}
        { !this.state.loginState && !this.state.loading ? this.loginPlease() : this.displayUsers() }
        <br/>
        <Link to='/'>Go back.</Link>
      </div>
    );
  }
}

Users.propTypes = {};

export default Users;
