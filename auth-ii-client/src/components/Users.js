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
            window.alert('Please login or create an account.');
            this.props.history.push('/');
        });
    }

    logoutHandler = e => {
        localStorage.removeItem('token');
        this.props.history.push('/');
      };
    

    render() {
        return (
            <div>
                <div className="logout-button">
                    {localStorage.getItem('token') && (
                    <button onClick={this.logoutHandler}>Logout</button>
                    )}
                </div>
                <div className="Users">
                    {this.state.users.map(user => 
                        <div className="name-card" key={user.id}>
                            <p>ID: {user.id}</p>
                            <p>Username: {user.username}</p>
                            <p>Department: {user.department}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    };

}

export default Users;