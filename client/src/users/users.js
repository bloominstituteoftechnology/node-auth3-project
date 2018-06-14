import React from 'react';
import axios from 'axios';
class Users extends React.Component {
    state = {
        users: [],
    };

    render() {
        return <ul>{this.state.users.map(user => <li>user.user.name</li>)}</ul>
    }

    componentDidMount() {
        axios
            .get('')
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export default Users;