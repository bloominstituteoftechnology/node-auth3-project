import React from 'react'

export const UserList = (props) => {
    console.log(props)
    return (
        <div>
            {props.loggedin ? null : <h1>Please login to view Users</h1>}
            {props.users.map((e) => {
                return (

                    <div key={e.username}>
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