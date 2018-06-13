import React, { Component } from 'react';
import axios from 'axios'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        console.log(this.state.users)
        const users = this.getUsers()
        this.setState({ users })
    }

    getUsers = () => {
        console.log("getting users...")
        console.log(localStorage.authorization)
        const config = {
            headers: {
                "authorization": 'Bearer ' + localStorage.authorization
            }
        }
        console.log(config)
        axios.get('http://localhost:5500/users', config)
            .then( users => {
                console.log(users)
                return users
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
 
export default UserList;