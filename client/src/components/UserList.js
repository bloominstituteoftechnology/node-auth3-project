import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
const jwtDecode = require('jwt-decode');


const Table = styled.table`
        margin: 30px auto 0 auto;
        background: rgba(255, 255, 255, 0.1);
        max-width: 600px;
        width: 100%;
`
const Td = styled.td`
    text-align: center;
    color: white;
    border-bottom: 1px dashed #fff;
`

const Tr = styled.tr`
    height: 50px;
    :hover {
        opacity: 0.7;
    }


`
const Th = styled.th`
    height: 30px;
    color: silver;
    border-bottom: 1px solid gray;

`

const NavigationWrap = styled.nav`

    top: 0;
    width: 100%;
    height: 75px;
    background: #0f0f0f;
    display: flex;
    align-items: center;

`
const Navigation = styled.div`
    display: flex;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    justify-content: flex-end;
    
    > p {
        color: #f4511e;
        margin: 0 10px;
        cursor: pointer;
    }
`

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            users: []
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
            users: response.data
        });
    } catch (error) {
        console.log(error, error.message)
    }
}

onClick = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
}

    render() { 
        return ( 
            <div>
             <NavigationWrap>
                <Navigation>
                    <p>Welcome {this.state.username} | </p>
                    <p onClick = {this.onClick}>Logout</p>
                </Navigation>
            </NavigationWrap>
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
                        <Tr key={user.id}>
                            <Td>
                                {user.id}
                            </Td>
                            <Td>
                                {user.username}
                            </Td>
                            <Td>
                                {user.department}
                            </Td>
                        </Tr>
                    )}
                </tbody>
            </Table>
            </div>
         );
    }
}
 
export default UserList;