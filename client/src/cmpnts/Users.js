import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: []
         }
    }

    componentDidMount() {

        const token = localStorage.getItem("jwt");

        const requestOptions = {
            headers: {
                Autherization: token
            }
        }

        axios
            .get('http://localhost:5500/api/auth/login', requestOptions)
            .then(response => {
                this.setState({ users: response.data })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() { 
        return ( 
            <ul>
                {this.state.users.map(user => {
                    <li key={user._id}>user.username</li>
                })}
            </ul>
         )
    }
}
 
export default Users;
