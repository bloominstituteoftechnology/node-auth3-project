import React, { Component } from 'react';
import axios from 'axios';


class UserList extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        //get the token from local storage that set in signin file.
        //attach the token as the Authorization header
        const token = localStorage.getItem('jwt');
        console.log('token:', token)
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }

        axios
            .get('http://localhost:5500/api/users', requestOptions)
            .then(res => {
                console.log('res: ', res.data)
                this.setState({ users: res.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    signout = () => {
        if(localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className='container'>
            <div className='top-section'>
                <h2 className='user-header'>List of Members</h2>
                <a href='#' className='sign-out' onClick={this.signout}>Sign out</a>
            </div>
            <div>
                {this.state.users.map(user => <ol key={user._id}>{user.username}</ol>)}
            </div>
            </div>
        );
    }
}

export default UserList;