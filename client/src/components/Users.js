import React from 'react'
import axios from 'axios'

class Users extends React.Component {
    state = {
        users: []
    }

render() {
    return (
        <ul> {this.state.users.map(user => <li key={user._id}>
            {user.username}</li>)}
        </ul>
    )
}

componentDidMount() {
    // get token from somewhere
    const token = localStorage.getItem('token');
    console.log('token', token)
    // attach token as Authorization header
    const requestOptions = {
        headers: {
            authoritzation: token,
        }
    };
    axios.get('http://localhost:5500/api/users', requestOptions)
        .then(response => {
            this.setState({ users: response.data });
        })
        .catch(err => {
            this.props.history.push('/signin')
        })
    }
}

export default Users