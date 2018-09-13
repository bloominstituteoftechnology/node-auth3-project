import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
          <li>
            <Link to="login">Log In</Link>
          </li>
          <li>
            <a onClick={this.logout}>Log Out</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
