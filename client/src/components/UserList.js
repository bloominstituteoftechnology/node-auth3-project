import React from "react";

function UsersList (props){
    return (
        <div>
            <ul>{props.users.map(user => 
                <li key={user.id}>
                    <h1>Name: {user.username}</h1>
                    <h2>Department: {user.department}</h2>
                </li> )}</ul>
            <button onClick={props.signOut}>SignOut</button>
        </div>
    )
}

export default UsersList