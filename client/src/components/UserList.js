import './UserList.css';
import React from 'react';
import axios from 'axios';


class UserList extends React.Component {
    state = { users: '' }

    componentDidMount(){
        console.log('UserList')
        axios.get('http://localhost:8888/api/users', {headers: {authorization: localStorage.getItem('jwt')}})
             .then(res => {
                 console.log(res)
                this.setState({users: res.data})
             })
             .catch(err => console.log('error userlist',err))
    }
    render() { 
        return ( 
            <div>
            {this.state.users ? this.state.users.map(user => {
                return <div>{user.username}</div>
            }) : 'Users.'}
            </div>
         );
    }
}
 
export default UserList;