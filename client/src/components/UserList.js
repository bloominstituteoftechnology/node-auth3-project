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
        const token = localStorage.getItem('jwt');
    const address = `http://localhost:9000/api/users`
    const options = {
        headers: {
            Authorization: token,
        },
    }
    axios.get(address, options)
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
                <h1>Users</h1>
                <div className = 'user-list'>
                    {this.state.users.map(user => {
                        return <div key = {user.id}>
                        <span>UserID: {user.id}</span>
                        <span>Username: {user.username}</span>
                        <span>Department: {user.department}</span>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
}
export default withRouter(UserList);