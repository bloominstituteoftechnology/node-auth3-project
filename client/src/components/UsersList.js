import React from 'react';
import axios from 'axios';
import User from './User';

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.get('http://localhost:7001/api/users', requestOptions)
        .then(response => {
            console.log('response from userlist', response)
            this.setState({users: response.data})
        })
    }
    
    render() {
            return(
                <div>
                    {this.state.users.map(user => <User user={user} />)}
                </div>
        )
    }
}

export default UsersList;