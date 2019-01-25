import React from 'react';
import {NavLink,Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.switchButton = this.switchButton.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  switchButton(){
    if(this.props.loggedIn === false){
      return <NavLink to="/signin" className="nav-link">Login</NavLink>
    } else return <Link to="/signin" onClick={()=> this.props.logout()} className="nav-link">Logout</Link>
  }
  render() {
    return (
      <div>
        {console.log(this.props.loggedIn)}
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Auth Mini II APP</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavLink className="nav-link" to='/' exact>Home</NavLink>
            <NavLink className="nav-link"to='/users'>Users</NavLink>
            <NavLink className="nav-link" to='/register'> Register</NavLink>
            {this.switchButton()}
            </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
              