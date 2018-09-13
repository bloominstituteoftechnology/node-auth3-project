import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
const jwtDecode = require('jwt-decode');

const List = styled.div`

`
const Table = styled.table`

`
const Td = styled.td`

`
const Th = styled.th`

`

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            users: [],
            canSee: false
         }
    }

componentDidMount() {
    this.getUsers();
}

getUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token){
        this.props.history.replace('/login');
    }

    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/users/',
            headers: { authorization: token }
        });

        const decoded = jwtDecode(token);
        this.setState({
            username: decoded.username,
            users: response.data,
            canSee: true
        });
    } catch (error) {
        this.setState({ canSee: false });
    }
}

onClick = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
}

    render() { 
        const usersTable = (
            <Table>
                <thead>
                    <tr>
                        <Th>ID</Th>
                        <Th>Username</Th>
                        <Th>Department</Th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(user => 
                        <tr key={user.id}>
                            <Td>
                                {user.id}
                            </Td>
                            <Td>
                                {user.username}
                            </Td>
                            <Td>
                                {user.department}
                            </Td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
        const CantSee = (
            <div>
        <h1>You are not authorized to see the contents.</h1>
        </div>
        );

        return ( 
            <List>
                {this.state.canSee ? usersTable : CantSee}
                <button onClick = {this.onClick}>Logout</button>
            </List>
         );
    }
}
 
export default UserList;