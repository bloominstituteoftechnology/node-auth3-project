import React, { Component } from 'react';
import axios from 'axios';




class Users extends Component {
    
    
    state = {
        users: [],
    };


    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </div>
    );
    }

    // handleChange = event => {
    //     const {name, value} = event.target;
    //     this.setState({ [name]: value })
    // }


    componentDidMount(){ //34:00 
        
        const token = localStorage.getItem('jwt');
        const reqOptions = {
            headers: {
                Authorization: token
            }
        }

        axios
            .get('http://localhost:1111/api/users', reqOptions)
            .then(res => {
                console.log('Users Data:', res.data);
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.error('Axios Error', err)
        });

    };






    

}




export default Users;
