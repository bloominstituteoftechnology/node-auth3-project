import React from 'react';
import axios from 'axios';


class Users extends React.Component {
    state = {
        users: [],
    };

    // render() {
    //     return
    //     <ul>
    //         {this.state.users.map(user => <li key={user.id}>{user.name}</li>)}
    //     </ul>
    // }

    componentDidMount() {
        // get token
        const token = localStorage.getItem('jwt');

        // attach the token a the Authorzation header
        const requestOptions = {
            headers: {
                Authorization: token,
            },
        };
        axios
            .get('http://localhost:5500/api/users', requestOptions)
            .then(response => {
                console.log(response.data);
                this.setState({ users: [{username: 'xang'}, {username: 'lavell'}] });
                console.log(response.data);
            })
            .catch(err => {
                console.log('error from users');
            });
    }
    render() {
        console.log(this.state.users);
        return (
            <div>
                from users!
                <ul>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                </ul>
            </div>
        )
    }
}

export default Users;