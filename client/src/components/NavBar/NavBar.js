import React from 'react';
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {

    signout = () => {
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt');

            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="button-container">
                    <Link to="/"><Button color="primary">Home</Button></Link>
                    <Link to="/login"><Button color="success">Login</Button></Link>
                    <Link to="/register"><Button color="secondary">Register</Button></Link>
                    {localStorage.getItem('jwt') && <Button color="danger" onClick={this.signout}>Logout</Button>}
                </div>
            </div>
        )
    }
}

export default withRouter(NavBar); 
