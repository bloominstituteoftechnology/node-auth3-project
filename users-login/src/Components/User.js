import React from 'react';

class User extends React.Component{
    render(){
        return(
            <div className = 'user-container'>
                <h3 className = 'username-header'>Username: {this.props.username}</h3>
                <h3 className = 'userId-header'>User ID: {this.props.userId}</h3>
                <h3 className = 'department-header'>Department: {this.props.department}</h3>
            </div>
        )
    }
}

export default User;