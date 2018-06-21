import React from 'react';
import axios from 'axios';
import { link } from 'fs/promises';

class Users extends React.component
{
    state = { users: [] };
    render()
    {
        <ul>{this.state.users.map (user =><li>user.username</li>)}</ul>;
    }
    componentDidMount()
    {
        axios
            .get( 'http://localhost:5500/api/users' )
            .then( response =>
            {
            
            } )
            .catch( err =>
            {
            
            } );
    }
}
export default Users;
