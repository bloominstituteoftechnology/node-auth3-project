import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    const logout = () => {
        localStorage.clear('jwt');
    };

    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/users">Users</Link>
            <button type="button" onClick={logout}>
                Sign out
            </button>
        </nav>
    );
};

export default TopBar;
