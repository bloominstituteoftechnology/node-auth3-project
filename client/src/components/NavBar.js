import React, { Component } from 'react';
import logo from '../logo.svg';
import { Navbar, NavbarBrand, Nav, NavLink, Button } from 'reactstrap';
import { withRouter } from 'react-router'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('authorization')) {
            this.setState({signedIn: true})
            console.log(this.props)
        }
    }

    signOut = () => {
        localStorage.clear()
        this.setState({signedIn: false})
        this.props.history.push('/signin')
    }

    render() { 
        return (
            <Navbar className="App-header">
                <NavbarBrand className="brand"> 
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Authentication using JWTs</h1>
                </NavbarBrand>
                <Nav className="nav">
                    <NavLink className="navlink" href="/users">Home</NavLink>
                    {!this.state.signedIn && (
                        <React.Fragment>
                            <NavLink className="navlink" href="/signin">
                                <Button className="nav-btn" color="primary">Log in</Button>
                            </NavLink>
                            <NavLink className="navlink" href="/signup">
                                <Button className="nav-btn">Sign up</Button>
                            </NavLink>
                        </React.Fragment>
                    )}
                    {this.state.signedIn && (
                        <NavLink className="navlink">
                            <Button 
                                className="nav-btn" 
                                color="danger"
                                onClick={this.signOut}>
                                Sign out
                            </Button>
                        </NavLink>
                    )}
                </Nav>
            </Navbar>
        )
    }
}
 
export default withRouter(NavBar);