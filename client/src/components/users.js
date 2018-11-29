import React, { Component } from 'react';
import axios from 'axios';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('user-token')
        if(token) {
            axios.defaults.headers.common['Authorization'] = token;
        }
        axios.get('http://localhost:9000/api/users')
        .then((res) => {
            this.setState({users: res.data})
            console.log(res.data)
        })
        .catch(err => 
            console.log(err))
    }

    signOut = (ev) => {
        ev.preventDefault();
        localStorage.removeItem('user-token');
        window.location = '/login';
    }

    render() {
        return (
            <div>
                <button onClick={this.signOut}>Sign Out</button>
                {this.state.users.map(information => {
                    return (
                    <div>
                        <h2>{information.username}</h2>
                        <p>{information.department}</p>
                    </div>
                    );
                })}
            </div>
        )
     }
}

export default UserInfo;