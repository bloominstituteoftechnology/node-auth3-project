import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const reqOptions = {
            headers: {
                authorization: token
            }
        }
        axios
            .get('http://localhost:8000/api/users', reqOptions)
            .then(response => {
                console.log(response);
                this.setState({users: response.data})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return(
            <div>
                
                    {this.state.users.map(user => {
                        return<ul> <li>{user.username}, {user.department}</li></ul>
                    })}
                
            </div>
        )
    }
}

export default Users;