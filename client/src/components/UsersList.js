import React from 'react'

export const UserList = (props) => {
    return (
        <div>
            {props.users.map((e) => {
                return (
                    <div>
                        <h1>{e.username}</h1>
                        <h6>{e.race}</h6>
                    </div>
                );
            })}
        </div>
    )
}

UserList.defaultProps = {
    users: [],
}