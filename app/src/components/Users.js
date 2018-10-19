import React from 'react';
import axios from 'axios';

class Users extends React.Component{
    state = {
        users: []
    }

    render(){
        return(
            <div>
                Users:
                {this.state.users.map(user => {
                    return(
                        <div key={user.id}> {user.username} </div>
                    );
                })}
            </div>
        )
    }

    componentDidMount(){
        const token = localStorage.getItem('jwttoken');
        const options = {
            headers: {
                Authorization: token
            }
        };
        const endpoint = 'http://localhost:8000/api/users';
        axios
            .get(endpoint, options)
            .then(response => {
                this.setState({users:response.data.users});
                console.log(response.data);
            })
            .catch(error => console.error('ERROR', error));
    }
}

export default Users;