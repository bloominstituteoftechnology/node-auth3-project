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
        // const token = this.props.token;
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.get('http://localhost:7001/api/users', requestOptions)
        .then(response => {
            console.log('response from userlist', response)
            this.setState(function() {
                return {users: response.data} 
            })
        })
        console.log('first string');  
    }
    
    render() {
        if (this.state.users.length > 0) {
                return(
                    <div>
                        <h1>Users List</h1>
                        {this.state.users.map(user => <User user={user} key={user.id} />)}
                        {/* {this.state.users.map(user => 
                            <div>
                            <p>{user.username}</p>
                            <p>{user.department}</p>
                            </div>)} */}
                    </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default UsersList;