import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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

    signout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            // this.props.history.push('/signin');
        }
    };

    

    render() { 
        return (
            <div>
                <ul>
                    {this.state.users.map(user => <p key={user._id}>{user.username}</p>)}
                </ul>
                <Link to="/">
                    <button className="home-button">
                        Signout
                    </button>
                </Link>
            </div>
            )
            
    }
}
 
export default Users;