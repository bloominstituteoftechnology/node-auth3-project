import React from 'react';
import axios from 'axios';
import requireAuth from '../auth/requireAuth';

import UserCard from  './UserCard';
import { Jumbotron } from 'reactstrap';

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
            <Jumbotron>
                <h2>Users</h2>
                { this.state.users.map(u => <UserCard key={u.id} u={u} >{ u.username }</UserCard>) }
            </Jumbotron>
        )
    }
}

export default requireAuth(Users);
