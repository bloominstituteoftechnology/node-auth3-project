import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/users')
        .then ( res => this.setState({ users: res.data}))
        .catch ( err => console.log(err.message))
    }
    render(){
        return (
            <div>
                {this.state.users.map( user => {
                    
                })}
            </div>
        )
    }
};

export default Users;