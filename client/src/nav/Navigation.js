import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = (props) => {
    return (
        <div className="Nav">
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                {!localStorage.getItem('jwt') && <NavLink to="/SignUp">SignUp</NavLink>}
            </div>
            <div>
                {!localStorage.getItem('jwt') && <NavLink to="/SignIn">SignIn</NavLink>}
            </div>
            <div>
                {localStorage.getItem('jwt') && <NavLink to="/users">Users</NavLink>}
            </div>
            <div>
                {localStorage.getItem('jwt') && <NavLink to="/" onClick={props.handleLogout}>LogOut</NavLink>}
            </div>
        </div>
    );
}