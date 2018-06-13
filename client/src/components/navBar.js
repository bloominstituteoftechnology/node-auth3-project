import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Button} from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar color="dark">
          <Nav>
            <NavItem>
                <Button color="danger">
              <Link to="/" style={{ color: "white" }} >Log In</Link>
            </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
