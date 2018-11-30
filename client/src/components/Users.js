import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            users: [],
        }
    }

    authenticate = () => {
        const token = localStorage.getItem('my_token');
        const options = {
            headers: {
                Authorization: token
            }
        }

        if (token) {
            axios.get(`${url}/api/users`, options)
                .then(res => {
                    if(res.status === 200 && res.data) {
                        this.setState({loggedIn: true, users: res.data})
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    this.props.history.push('/signin')
                })
        } else {
            this.props.history.push('/signin')
        }
    }
    
    componentDidMount() {
        this.authenticate()
    }

    componentDidUpdate(prevProps) {
        const { pathname } = this.props.location;
        if (pathname === '/' && pathname !== prevProps.location.pathname) {
          this.authenticate();
        }
    }
      
      logout = () => {
          localStorage.removeItem('my_token')
          this.props.history.push('/')
      }

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
                <h2>Users</h2>
                <ol>
                    {this.state.users.map(user => 
                        <li key={user.id}>{`username: ${user.username} department: ${user.department}`}</li>    
                    )}
                </ol>
            </div>
        )
    }

}