import React, { Component } from 'react';
import axios from 'axios'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        const config = {
            headers: {
                "Authorization": localStorage.authorization
            }
        }
        axios.get('http://localhost:5500/api/users', config)
            .then( users => {
                this.setState({ users: users.data })
            })
            .catch( err => {
                console.log(err)
            })
    }

    render() { 
        return (
            <div className="usersContainer">
                {this.state.users.map( user => {
                    return (
                        <div className="userContainer" key={user.username}>
                            <h3>{user.username}</h3>
                            <p>{user.race}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
 
export default Users;