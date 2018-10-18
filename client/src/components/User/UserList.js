import React, { Component } from 'react'
import UserListCard from './UserListCard';

const UserList = props => {
    const {users} = props
    return(
      <div>
        <div>
            <h2>UserList</h2>
            {users.map(user => <UserListCard user={user}/>)}
        </div>
    </div>  
    )
}

export default UserList

