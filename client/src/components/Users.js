import React from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
            users: []
        }
    }

    checkAuthorization = () => {
        const token = localStorage.getItem('unimportant');
        const options = {
            headers: {
                authorization: token
            }
        };

        if (token) {
            axios.get(`${url}/api/users`, options)
                .then(res => {
                    if (res.status === 200 && res.data) {
                        console.log(res.data);
                        this.setState({
                            authorized: true,
                            users: res.data
                        })
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    this.props.history.push('/login');
                })
        } else {
            //make nicer (timeout)
            this.props.history.push('/login');
        }
    }

    componentDidMount() {
        this.checkAuthorization();
    }

    render() {
        if (this.state.users.length) {
            return (
                <div>
                    <h2>Department: {this.state.users[0].department}</h2>
                    {this.state.users.map(user => {
                        return <h3>{user.username}</h3>
                    })}
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export default Users;