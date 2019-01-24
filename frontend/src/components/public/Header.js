import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        let logout;

        return (
            <header>
                <Link to="/" className="header-title">
                    <h1>Authentication</h1>
                    <h2> with <span className="">JSON Web Tokens</span></h2>
                </Link>
                <section className="header-controls">
                    {localStorage.getItem('jwt') ?
                        <><p>Hello, {localStorage.getItem('username')}</p> | <Link to="/users">Users</Link> | <Link to="/auth/logout">Logout</Link></> :
                        <><Link to="/auth/login">Login</Link> | <Link to="auth/register">Register</Link></>
                    }
                </section>
            </header>
        );
    }
};

export default Header;