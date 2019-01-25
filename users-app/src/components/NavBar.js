import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export default class NavBar extends React.Component {
  signout = e => {
    localStorage.removeItem("jwt");
  };
  render() {
    return (
      <div className="navBar">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Users App</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signin">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" onClick={() => this.signout()}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
