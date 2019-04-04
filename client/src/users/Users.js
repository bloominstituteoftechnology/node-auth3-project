import React from 'react';
import axios from 'axios';
import requireAuth from '../auth/requireAuth';

class Users extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.get('/')
            .then(res => {
                this.setState({ users: res.data.users })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return(
            <>
                <h2>Users</h2>
                <ul>
                    { this.state.users.map(u => <li key={u.id}>{ u.username }</li>) }
                </ul>  
            </>
        )
    }
}

export default requireAuth(Users);
