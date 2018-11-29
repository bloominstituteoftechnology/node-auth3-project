import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedIn: false
    };
  }

  authenticate = () => {
    const token = localStorage.getItem("tolkien_token");
    const options = {
      headers: {
        authorization: token
      }
    };

    if (token) {
      axios
        .get(`${url}/api/users`, options)
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          this.props.history.push("/signin");
        });
    } else {
      this.props.history.push("/signin");
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  logout = event => {
    event.preventDefault();
    localStorage.removeItem("tolkien_token");
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn ? (
          <button onClick={this.logout}>Logout</button>
        ) : (
          undefined
        )}

        <h2>User</h2>
        <ol>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ol>
      </React.Fragment>
    );
  }
}
