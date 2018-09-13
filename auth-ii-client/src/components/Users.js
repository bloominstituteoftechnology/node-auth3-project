import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        const requestOptions = {
            headers: {
                authorization: token
            }
        };

        axios
        .get('http://localhost:3300/api/users', requestOptions)
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch(err => {
            console.error(err)
        });
    }

    logoutHandler = e => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
      };
    

    render() {
        return (
            <div className="Users">
                <div>
                    {localStorage.getItem('token') && (
                    <button onClick={this.logoutHandler}>Logout</button>
                    )}
                </div>
                <ul>
                    {this.state.users.map(user => 
                        <li key={user.id}>{user.username}</li>
                    )}
                </ul>
            </div>
        )
    };

}

export default Users;