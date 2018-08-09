import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
const jwtDecode = require('jwt-decode');

const Content = styled.div`
    width: 70%;
    margin: auto;
    font-family: 'Lora', Serif;
    font-Size: 14px;
    margin-bottom: 20px;
`

const Table = styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
`

const Td = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`

const Th = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    background: #404F50;
    color: #F1FAEE;
    font-family: 'Roboto', Sans-Serif;
`

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #F0F8F8;
    }
`

const Header = styled.h1`
    font-family: 'Roboto', Sans-Serif;
    font-size: 48px;
    color: #404F50;
`

const Warning = styled.p`
    width: 60%;
    font-size: 16px;
    font-weight: bold;
    color: #E63946;
    margin: 10px auto;
    font-family: 'Lora', Serif;
    font-Size: 24px;
    text-align: center;
`

const Nav = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    text-align: right;
    background: #404F50;
    color:  #F1FAEE;
`
const Button = styled.button`
    background: none;
    color: #F1FAEE;
    border: none;
    cursor: pointer;
    &:hover {
        color: salmon;
    }
    font-weight: bold;
    font-size: 16px;
`
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            users: [],
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        const token = localStorage.getItem('token');
        if (!token){
            this.props.history.replace('/signin');
        }

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8000/api/users/',
                headers: { authorization: token }
            });

            const decoded = jwtDecode(token);
            this.setState({
                username: decoded.username,
                users: response.data,
                isAuthenticated: true
            });
        } catch (error) {
            this.setState({ isAuthenticated: false });
        }
    }

    onClick = () => {
        localStorage.removeItem('token');
        this.props.history.push('/signin');
    }

    render() {
        const userTable = (
            <Content>
                <Nav>
                    Welcome! You're logged in as {<span style={{color: '#A8DADC', marginLeft: '4px', marginRight: 'auto'}}>{this.state.username}</span>}
                    <Button onClick = {this.onClick}>Logout</Button>
                </Nav>
                <Header>Users List</Header>
                <Table>
                    <thead>
                        <Tr>
                            <Th>User Id</Th>
                            <Th>Username</Th>
                            <Th>Department</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) =>
                            <Tr key={index}>
                                <Td>{user.id}</Td>
                                <Td>{user.username}</Td>
                                <Td>{user.department}</Td>
                            </Tr>)}
                    </tbody>
                </Table>
            </Content>
        );

        const warning = <Warning>
            You are unauthorized to view this content.
            <br />
            Redirecting to login page...
            </Warning>;

        return (
            <Content>
                {/* {this.state.isAuthenticated ? userTable : warning} */}
                {userTable}
            </Content>
        );
    }
}

export default UserList;