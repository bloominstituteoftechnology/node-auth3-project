import React from 'react';

const User = (props) => {
    return(
        <div>
            <p>Username: {props.user.username}</p>
            <p>Password: {props.user.password}</p>
            <p>Department: {props.user.department}</p>
            <hr/>
        </div>
    )
}

export default User;