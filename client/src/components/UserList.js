import React, { Component } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { withRouter } from 'react-router'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem("authorization")) {
            this.getUsers()
        } else {
            this.props.history.push('/signin')
        }
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
            <React.Fragment>
                <NavBar />
                <div className="usersContainer">
                    <h1>Users: </h1>
                    {this.state.users.map( user => {
                        return (
                            <div className="userContainer" key={user.username}>
                                <h3>{user.username}</h3>
                                <p>{user.race}</p>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}
 
export default withRouter(UserList)