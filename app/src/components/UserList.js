import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';


class UserList extends React.Component {
  state = {
    users: [],
    error: null
  };
  componentDidMount() {
    axios
      .get("/api/users", {
        headers: {
          authorization: Cookies.get('token')
        }
      })
      .then(resp => {
        console.log(resp.data);
        this.setState({ users: resp.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  }
  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </div>
    );
  }
}

export default UserList;
