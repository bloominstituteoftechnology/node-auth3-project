import React, { Component, Fragment } from "react";
import axios from "axios";

// export const UsersList = props => {
//   return (
//     <div>
//       <div>
//         <h1>Welcome to the UsersList page.</h1>
//       </div>
//     </div>
//   );
// };
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
  render() {
    return (
      <Fragment>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
