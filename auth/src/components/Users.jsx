import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("JWT") !== null) {
      const JWT = localStorage.getItem("JWT");
      axios
        .get("http://localhost:3300/api/users", {
          headers: { Authorization: JWT }
        })
        .then(response => {
          this.setState({
            users: response.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }
  };
  render() {
    return <div >
      <ul> {this.state.users.map((e,i)=>{
        return <li key={i}>{e.user_name}</li>
      })}</ul>
     
    </div>;
  }
}

export default Users;
