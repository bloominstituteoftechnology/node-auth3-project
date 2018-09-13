import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.setState({loggedIn: false,})
        this.props.history.push('/')
      }

    render(props){
        return (
            <div className="header">
                {(this.props.location.pathname === '/login' ||       this.props.location.pathname === '/') ?
                    <Link to="register">register</Link>:
                 null}

                <Link to="/">Authorization App</Link>
                 
                {this.props.location.pathname === '/users' ?
                 <Link to="/" onClick={this.logout}>Logout</Link> :
                 null }
                
                {this.props.location.pathname === '/' ?
                <Link to="login">login</Link> :
                null}
                {this.props.location.pathname === '/register' ?
                <Link to="login">login</Link> :
                null}
            </div>
        )
    }
}

export default Header;