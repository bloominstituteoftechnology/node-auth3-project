import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const reqOpt = {
            headers: {
                Authorization: token
            }
        };
        axios
            .get(`http://localhost:8000/api/users`, reqOpt)
            .then(res => {
                console.log(res);
                this.setState({users: res.data});
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="App">
                <ul>
                    {this.state.users.map(user => {
                        return <li>{user.username}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Users;
