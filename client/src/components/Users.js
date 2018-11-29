import React, { Component } from 'react';
import axios from 'axios';

const keyName = process.env.REACT_APP_TOKEN_ITEM;
const url = process.env.REACT_APP_API_URL;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoggedIn: false,
        }
    }

    componentDidMount() {
        this.authenticate();
    }

    authenticate = () => {
        const token = localStorage.getItem(keyName);

        if(token) {
            const options = {
                headers: { 
                    authentication: token
                }
            };
            axios.get(`${url}/api/users`, options)
            .then(res => {
                if (res.status === 200) {
                    this.setState({isLoggedIn: true, users: res.data.users});
                } else {
                    throw new Error();
                }
            })
            .catch(err => console.log(err));
        }
    }
    
    render() {

        return this.state.isLoggedIn
        ?
            <div>
                <h1>
                    logged in
                </h1>
                {
                    this.state.users.map((user, index) => {
                        return (
                            <div key={index}>
                                <span> Username: </span><span>{user.username}</span>
                                <br/>
                                <span> Password: </span><span>{user.password}</span>
                            </div>
                        )
                    })
                }
            </div>
        :
            <div>
                <h1>
                    not logged in
                </h1>
            </div>
    }
}

export default Users;
