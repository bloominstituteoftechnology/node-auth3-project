import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/users">Users</Link>
        </nav>
    );
};

export default TopBar;
