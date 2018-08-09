import React from 'react'
import axios from 'axios'
class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:3300/api/users', requestOptions)
            .then(res => {
                this.setState({ users: res.data })
            })
            .catch(err => { console.log(err.response.data) })

    }
    render() {
        return (
            <div>
                {this.state.users.map(user => {
                    return <li key={user.id}>{user.username}</li>
                })}
            </div>
        )
    }
}

export default SignIn