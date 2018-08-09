import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='nav-container'>
            <Link to='/api/users'> Users</Link>
            <Link to='/api/signin'> Login</Link>
            <Link to='/api/register'>Register</Link>
        </div>
    );
}

export default Nav;