import React from 'react';
import User from './User';

const UsersList = (props) => {
    return (
        <ul>
        {props.users.map(user => {
        return <User key = {user.id} username = {user.username}/>
    
    })}
    </ul>
    );
}
 
export default UsersList;