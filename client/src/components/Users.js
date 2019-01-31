import React from "react";
import axios from "axios";
class Users extends React.Component {
  state = {
    users: []
  };

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;

    console.log(endpoint);
    try {
      const response = await axios.get(endpoint, requestOptions);

      this.setState({ users: response.data.users });
    } catch (error) {
      console.log("Error finding users");
    }
  }
}

export default Users;
