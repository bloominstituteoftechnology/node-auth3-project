import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        let logout;

        return (
            <header>
                <h1>Authentication Example</h1>
                <h2>JSON Web Tokens</h2>
                { localStorage.getItem('jwt') ? <Link to="/auth/logout">Logout</Link> : null }
            </header>
        );
    }
};

export default Header;