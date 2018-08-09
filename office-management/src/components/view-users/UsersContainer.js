import React, { Fragment, Component } from "react";
import UsersList from "./UsersList";
import axios from "axios";
class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        authorization: token
      }
    };
    axios.get("http://localhost:8001/api/users", requestOptions).then(res => {
      this.setState({ users: res.data });
    });
  }

  logoutHandler = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
  }

  render() {
    return (
      <Fragment>
        <UsersList users={this.state.users} />
        <button onClick = {this.logoutHandler}>Logout</button>
      </Fragment>
    );
  }
}

export default UserContainer;
