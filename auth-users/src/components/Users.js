import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Div = styled.div`
    font-weight: 700;
    color: white;
`;

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        const reqOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.get('http://localhost:8000/api/users', reqOptions)
        .then ( res => this.setState({ users: res.data }))
        .catch ( err => {
            console.log( err.message )
            this.props.history.push("/signin");
        });
    }
    render(){
        return (
            <div>
                {this.state.users.map( user => {
                    return (
                    <Div key={user.id}>
                        <ul>{user.username}</ul>
                    </Div>
                )})}
            </div>
        )
    }
};

export default Users;