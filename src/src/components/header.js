import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.setState({loggedIn: false,})
        this.props.history.push('/')
      }

    render(){
        return (
            <div className="header">
                {(this.props.location.pathname === '/login' ||       this.props.location.pathname === '/') ?
                    <Link to="register">register</Link>:
                 <div></div>}

                <Link to="/"><h1>Authorization App</h1></Link>
                 
                {this.props.location.pathname === '/users' ?
                 <Link to="/" onClick={this.logout}>Logout</Link> :
                 null }
                
                {this.props.location.pathname === '/' ?
                <Link to="login">login</Link> :
                null}
                {this.props.location.pathname === '/register' ?
                <Link to="login">login</Link> :
                <div></div>}
            </div>
        )
    }
}

export default Header;