import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users:[]
    };
  }

  componentDidMount() {
      const token = localStorage.getItem('jwt');

    const endpoint = "http://localhost:3300/api/users";
    const options = {
        headers:{
            Authorization: token
        }
    };

    axios
      .get(endpoint, options)
      .then(res => {
        console.log(res.data);
        this.setState({
            users:res.data
        })
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }
  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
            {this.state.users.map(u =>{
                return <li key={u.id}>{u.username}, From: {u.department}</li>
            })}
        </ul>
      </div>
    );
  }
}

export default Users;
