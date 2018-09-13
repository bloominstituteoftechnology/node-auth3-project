import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        const reqOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.get('http://localhost:8000/api/users', reqOptions)
        .then ( res => this.setState({ users: res.data }))
        .catch ( err => console.log( err.message ));
    }
    render(){
        return (
            <div>
                {this.state.users.map( user => {
                    return (
                    <div key={user.id}>
                        <li>{user.username}</li>
                    </div>
                )})}
            </div>
        )
    }
};

export default Users;