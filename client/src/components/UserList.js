import React from "react";
import axios from "axios";

class UserList extends React.Component {
    state = {
        users: []
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
            .catch(err => console.log(err));
    }

    render() {
        const { users } = this.state;
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
            </div>
        );
    }
}

export default UserList;