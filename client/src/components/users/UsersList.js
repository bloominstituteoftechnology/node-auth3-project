import React, { Component } from 'react';
import Axios from 'axios';


class UsersList extends Component {
    state = {
        users : []
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        const requesOption = {
            headers : {
                Authorization : token, 
            }
        }
    Axios.get('http://localhost:5000/api/users', requesOption )
        .then(response => {
           this.setState({ users : response.data})
        })
        .catch(err =>{
          
        })
    }
    
    render() {
        return (
            <div>
                <ul>
                {this.state.users.map(user =>{
                    return <li key={user.id}>{user.username}</li>
                })}
                </ul>
            </div>
        );
    }
}

export default UsersList;