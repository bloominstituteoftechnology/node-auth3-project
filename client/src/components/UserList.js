import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    background: black;
    color: #B9BEC4;
    font-family: 'Roboto', Sans-Serif;
`

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #dddddd;
    }
`

const Header = styled.h1`
    font-family: 'Roboto', Sans-Serif;
    font-size: 48px;
`

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios({
                method: 'get',
                url: 'http://localhost:8000/api/users/',
                headers: { authorization: token }
            });
            this.setState({
                users: response.data,
                isAuthenticated: true
            });
        } catch (error) {
            this.setState({ isAuthenticated: false });
        }
    }

    render() {
        const userTable = (
            <Content>
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

        const warning = <h3>You are unauthorized to see this content</h3>;
        return (
            <Content>
                {this.state.isAuthenticated ? userTable : warning}
            </Content>
        );
    }
}

export default UserList;