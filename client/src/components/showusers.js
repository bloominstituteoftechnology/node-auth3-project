import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";


class ShowUsers extends React.Component {
  state = {
    username: null,
    department: null, 
    users: []
  };

  componentWillMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const token = localStorage.getItem("token");
    const reqOptions = {
      headers: {
        Authorization: token
      },
      // body: {
      //   department: "student"
      // }
    };
    const promise = axios.get("http://localhost:9000/api/users", reqOptions);
    promise
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data.users,
          username: response.data.loggedIn.username
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  removeLocalStorage = () => {
    localStorage.removeItem("token");
    this.props.history.push("/signin");
  };

  render() {
    if (this.state.users.length) {
      const users = this.state.users.slice();
      return (
        <div>
          <h1>Welcome {this.state.username}</h1>{" "}
          <button onClick={this.removeLocalStorage}>Sign Out</button>
          {users.map((user, i) => {
            return (
              <div key={i + 100}>
                <h3 key={i}>User: {user.username}</h3>
                <h4 key={i + 10}>Department: {user.department}</h4>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Your not logged in!!</h1>
          <button><Link to ="/signin">Go to sign in page</Link></button>
        </div>
      );
    }
  }
}

export default withRouter(ShowUsers);
