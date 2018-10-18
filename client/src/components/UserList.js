import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Login from './Login';
 
class UserList extends React.Component {
     
    componentDidMount(){
        this.fetchUsers();
    }
     
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
     
    fetchUsers = () =>{
        const jwtToken = localStorage.getItem('jwt');
        const endpoint = `http://localhost:5000/api/users`
        const jwtOptions = {
            headers: {
                Authorization: jwtToken,
            },
        }

        axios.get(endpoint, jwtOptions)
        .then(res => {
            console.log(res.data)
            this.setState({
                users: res.data.users
            })
        })
        .catch(err => {
            console.error(err);
        })
    }
     
    render(){
        if(this.state.users.length < 1){
            return (
                <div className = 'error-text'>
                    You do not have access to view this page.
                        Please login to see the users.
                </div>
            )
        } else {
            return (
                <div>
                    <h1>User List:</h1>
                    <div className = 'UserList'>
                        {this.state.users.map(user => {
                            return <div key = {user.id}>
                            <div>UserID: {user.id}</div>
                            <div>Username: {user.username}</div>
                            <div>Department: {user.department}</div>
                            </div>
                        })}
                    </div>
                </div>
            )
        }
    }
}
export default withRouter(UserList); 