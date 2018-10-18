import React from 'react';
import axios from 'axios';

class UserList extends React.Component {
    componentDidMount(){
        const token = localStorage.getItem('jwt');
        const address = `http://localhost:9000/api/users`
        const options = {
            headers: {
                Authorization: token,
            },
        }
        axios.get(address, options)
        .then(res => {
            console.log(res.data)
            this.setState({
                users: res.data.users
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    constructor(props){
        super(props);
        this.state = {
            users: []
        }


    }
    render(){
        return(
            <div>
                <h2> List of users</h2>
                <div>
                    {this.state.users.map(user => {
                        return <div key = {user.id}>{user.username}</div>
                    })}
                </div>
            </div>
        )
    }
}

export default UserList;