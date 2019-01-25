import React, { Component } from 'react';
import axios from 'axios';


function RenderIfSignedIn(props) {
    if (props.users) {
        return props.users.map(user => {
            return (
                <ul>
                    <li key={user.id}>{user.username}</li>
                </ul>
            )})
    }
    else {
        return (
            <h2>You shall not see the current users!</h2>
        )
    }
}

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const options = {
            headers: {
                Authorization: token
            }
        }
        axios.get('http://localhost:4040/api/users', options)
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return(
            <div>
                <h1>Current users</h1>
                <RenderIfSignedIn users={this.state.users}/>
            </div>
        )
    }
}

export default Users;