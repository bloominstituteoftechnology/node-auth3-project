import React, { Component } from 'react';

class UserList extends Component {
    constructor(props){
        super(props);
}


    render() {
        return (
            <div>
                <ul>
                    {this.props.users.map(user=>{
                  return  <li key={user.id}>{user.username}</li>
                })}
                </ul>
            </div>
        );
    }
}

export default UserList;
