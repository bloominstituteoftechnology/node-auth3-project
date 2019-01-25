import React from 'react';
import User from './User';
import '../css/UsersPage.css';

class UsersPage extends React.Component{
    constructor(){
        super()
        this.state = {
            users : []
        }
    }
    render(){
        return(
            <div className = 'users-page-container'>
                <h1>Lambda Users</h1>
                {this.props.users.map(user =>{
                    return(
                       <User 
                            username = {user.username}
                            userId = {user.id}
                            department = {user.department}
                            key = {user.id}
                       />
                    )
                })}
            </div>
        )
    }
}

export default UsersPage;