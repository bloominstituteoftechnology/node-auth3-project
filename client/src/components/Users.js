import React from "react";

const Users = props => {
    const { users } = props;

    return (users ?
        <ol>
            {users.map(user => <li key={user.id}>{user.username}</li>)}
        </ol>
        : <h4>Log in to view users list</h4>
    );
}

export default Users;