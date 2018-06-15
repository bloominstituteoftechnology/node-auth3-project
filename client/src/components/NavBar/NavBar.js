import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {

    render() {
        return (
            <div className="navbar-container">
                <div className="button-container">
                    <Link to="/"><Button color="primary">Home</Button></Link>
                    <Button color="success">Login</Button>
                    <Link to="/register"><Button color="secondary">Register</Button></Link>
                    <Button color="danger">Logout</Button>
                </div>
            </div>
        )
    }
}

export default NavBar; 
