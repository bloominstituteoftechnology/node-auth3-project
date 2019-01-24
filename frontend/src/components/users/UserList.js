import React from 'react';
import axios from 'axios';
import UserItem from './UserItem';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: false,
            users: []
        }
    }

    componentDidMount() {
        this.setState({...this.state, loading: true});
        const token = localStorage.getItem('jwt');
        const headers = { headers: {"Authorization" : token} };
        axios.get('http://localhost:5000/api/users', headers)
            .then(response => {
                this.setState({error: null, loading: false, users: response.data});
            })
            .catch(err => {
                this.setState({error: "Unable to retrieve users from server", loading: false, users: []});
            })

    }

    render() {
        return (
            <section className="users-content">
                <h1>Users:</h1>
                <section className="user-list">
                    { this.state.loading === true ? <h3>Loading...</h3>: null }
                    { this.state.error !== null ? <h3>{this.state.error}</h3> : null }
                    { this.state.users.map(user => <UserItem user={user} key={user.id} /> ) }
                </section>
            </section>
        )
    }
}

export default UserList;