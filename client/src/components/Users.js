import React, { Component } from 'react';
import axios from 'axios'


class Users extends Component {
    state = {
        users:[]
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt');
        const reqOptions = {
            headers : {
                Authorization :token
            }
        }
        axios
            .get('http://localhost:3300/api/users', reqOptions)
            .then(res => {
                console.log(res.data);   
                this.setState({users: res.data})             
            })            
            .catch(err => {
                console.error(err);
            });
    }

    logOut = () => {
        localStorage.removeItem('jwt')
    }

    render() {console.log(this.state.users)
        return (
            <div>
                <button onClick = {this.logOut}>Sign Out</button>
                {this.state.users.map(user => {
                    <div key = {user.id}>{user.username}</div>
                })}
            </div>
        );
    }
}

export default Users;