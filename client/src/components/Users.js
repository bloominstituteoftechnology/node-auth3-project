import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class Users extends React.Component {
    state = {
        users: [],
        username: ''
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
    
    componentWillMount() {
        let username = localStorage.getItem('username');
        username = username ? username : '';
        this.setState({ username: username })
    }
    

    signout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            this.props.history.push('/login');
        }
    };

    
    render() { 
        console.log(this.props)
        return (
            <div>
                {localStorage.getItem('token') && (
                    <h3>Welcome {this.state.username}!</h3>
                )}
                <h4>USERS</h4>
                <div>
                    {this.state.users.map(user => <p key={user._id}>{user.username}</p>)}
                </div>
                {localStorage.getItem('token') && (
                    <button onClick={this.signout} className="home-button">
                        Sign out
                    </button>
                )}
            </div>
            )
    }
}
 
export default Users;