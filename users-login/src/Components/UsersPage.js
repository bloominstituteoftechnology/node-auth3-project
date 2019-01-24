import React from 'react';

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
               
            </div>
        )
    }
}

export default UsersPage;