import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class UsersList extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:4000/api/users", reqOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log("AXIOS GET USERS ERR", err));
  }
  signoutHandler = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };
  render() {
    return (
      <Fragment>
        <ul style={{ margin: "1rem 0" }}>
          {this.state.users.map(user => (
            <Fragment key={user.id}>
              <li
                style={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  margin: ".5rem 0",
                }}
              >
                {user.username}
              </li>
              <li>-{user.department}-</li>
            </Fragment>
          ))}
        </ul>
        <button onClick={this.signoutHandler}>Sign Out</button>
      </Fragment>
    );
  }
}

export default withRouter(UsersList);
