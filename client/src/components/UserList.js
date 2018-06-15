import React from "react";
import axios from "axios";

class UserList extends React.Component {
    state = {
        users: [],
        error: false
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        };
        axios.get('http://localhost:5500/api/users', requestOptions)
            .then(response => this.setState({ users: response.data }))
            .catch(err => {
                    this.setState({ error: err.message });
                    setTimeout(() => {
                        this.props.history.push('/login');
                    }, 2200);
            });
    }

    render() {
        const { users, error } = this.state;
        return (
            <div>
                {users.map(user => {
                    return (
                        <div key={user._id} className="user">
                            <h3>{user.username}</h3>
                            <h5>race:</h5>
                            <p>{user.race}</p>
                        </div>
                    );
                })}
                { error ? (                    
                    <div>
                        <h3>Please Log In</h3>
                        <p>Redirecting...</p>
                    </div>
                ):(null)}
            </div>
        );
    }
}

export default UserList;