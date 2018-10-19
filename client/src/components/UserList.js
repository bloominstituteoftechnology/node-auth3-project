import React from 'react';

export default function Register(props) {
    console.log(props);
    return (
        <div>
            {props.users.map(user => {
                return (
                    <div key={user.id}>
                        <h3>ID: {user.id}</h3>
                        <p>Username: {user.username}</p>
                        <p>Department: {user.department}</p>
                    </div>
                )
            })}
        </div>
    )
}