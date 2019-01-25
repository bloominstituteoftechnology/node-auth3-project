
import React from 'react';
import axios from 'axios';
// import { list } from 'postcss';

class Users extends React.Component {
    state = {
        users: []
    };


    render() {
        return (
            <>
                <h2> List of Users </h2>
                <ul>{this.state.users.map(u =>(
                    <li key={u.id}>{u.username}</li>
                ))}
                </ul>
            </>
        )
    }

    async componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/users`;

        try {
            const token = localStorage.getItem('jwt');
            const requestOptions = {
                headers: {
                    authorization: token
                }
            }
            const response = await axios.get(endpoint, requestOptions);
        console.log(response);

            this.setState({ users: response.data.u });
        } catch (error){
            console.log('issue getting users')
        }
    }
}

export default Users;