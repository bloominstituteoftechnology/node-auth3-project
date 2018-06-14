import React from "react";
import axios from "axios";

class Users extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }

        axios.get('http://localhost:5500/api/users', requestOptions)
             .then(response => {
                 this.setState({ users: response.data });
        })
            .catch(err => {
                console.error(err);
            });

    }

    render() { 
        return (<ul>
            {this.state.users.map(user => <p key={user._id}>{user.username}</p>)}
        </ul>)
    }
}
 
export default Users;