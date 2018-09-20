import React, { Component } from "react";

import "./App.css";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }

  //grab either username or password from event.target
  //     handleChange = event => {
  //     const {name, value} = event.target;
  // this.setState({[name]: value});
  // }

  componentDidMount() {

const token = localStorage.getItem('jwt')

const reqOptions = {
headers: {
    authorization: token,
},

};

    //   event.preventDefault();
    //   console.log(this.state);

    axios
      .get("http://localhost:3300/api/users", reqOptions)
      .then(res => {
        console.log(res.data);
        this.setState({users: res.data})

        // console.log(res.data);
        // localStorage.setItem('jwt', res.data.token);
      })
      .catch(err => {
        console.error("Axios error", err);
      });
  }
}

export default Users;
