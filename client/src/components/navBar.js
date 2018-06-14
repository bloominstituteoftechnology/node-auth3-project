import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav, NavItem, Button, NavbarBrand } from "reactstrap";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect1: false
    };
  }
  render() {
  
    let redirect = this.state.redirect1
    if (redirect) {
     return <Redirect to='/' />
    } 
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
                  size="md"
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
                  size="md"
                  style={{ boxShadow: "1px 1px 1px white", marginRight: '20px' }}
                >
                  Sign Up
                </Button>
                </Link>
                <Button
                onClick={this.signout}
                  color="danger"
                  size="md"
                  style={{ boxShadow: "1px 1px 1px white" }}
                >
                  Log Out
                </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
  signout = () => {
    if (localStorage.getItem('authorization')) {
      localStorage.removeItem('authorization')
      this.setState({ redirect1: true })
    }
    console.log(this.state.redirect)
    // console.log("ls", localStorage.getItem('authorization'))
  };

}


export default NavBar;
