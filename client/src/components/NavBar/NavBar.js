import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import './NavBar.css'; 

class NavBar extends React.Component {

    render() {
        return (
            <div className="navbar-container">
                <div className="button-container"> 
                    <Button color="primary">Home</Button>
                    <Button color="success">Login</Button>
                    <Button color="secondary">Register</Button>
                    <Button color="danger">Logout</Button> 
                </div> 
            </div>
        )
    }
}

export default NavBar; 
