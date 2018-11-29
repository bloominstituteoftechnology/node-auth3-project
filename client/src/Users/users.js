import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {
    
    state = {
        users: []
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        const options = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:3300/api/users', options)
            .then(res => {
                console.log(res)
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <h1>Users</h1>
                <div>
                    {this.state.users.map(user => {
                        return(
                            <li key={user.id}>{user.username}</li>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Users;