import React from 'react'

const UserListCard = props => {
    const {id, username, department} = props.user
    return (
        <div>
            <h4>{username}</h4>
            <h5>Department: {department}</h5>
            
        </div>
    )
}

export default UserListCard