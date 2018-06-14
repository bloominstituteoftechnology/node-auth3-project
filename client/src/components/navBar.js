import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Button, NavbarBrand } from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar color="dark" style={{ display: "flex", padding: "20px" }}>
          <NavbarBrand style={{ color: "white" }}>
            Authentication or Whatever
          </NavbarBrand>
          <Nav>
            <NavItem>
              <Link to="/" style={{ color: "white" }}>
                <Button
                  color="danger"
                  size="lg"
                  style={{
                    marginRight: "20px",
                    boxShadow: "1px 1px 1px white"
                  }}
                >
                  Log In
                </Button>
              </Link>

              <Link to="/signup" style={{ color: "white" }}>
                <Button
                  color="danger"
                  size="lg"
                  style={{ boxShadow: "1px 1px 1px white" }}
                >
                  Sign Up
                </Button>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
