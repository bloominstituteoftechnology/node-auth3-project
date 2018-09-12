import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const List = styled.div`

`
const Table = styled.table`

`
const Td = styled.td`

`
const Th = styled.th`

`



const url = 'http://localhost:4000/users/';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [],
            canSee: false
         }
    }

componentDidMount() {
    axios.get(url)
        .then(response => {
            this.setState({
                users: response.data,
                canSee: true
            })
        })
        .catch(error => {
            this.setState({
                canSee: false
            })
            console.log(error);
        })
}

    render() { 

        const usersTable = (
            <Table>
                <thead>
                    <tr>
                        <Th>User</Th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(user => 
                        <tr key={user.id}>
                            <Td>
                                {user.username}
                            </Td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
        const CantSee = <h1>You are not authorized to see the contents.</h1>;

        return ( 
            <List>
                {this.state.canSee ? usersTable : CantSee}
            </List>
         );
    }
}
 
export default UserList;