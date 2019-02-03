import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component { 
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    render() {
        return(
            <div>
                <h2>List of users</h2>
                <ul>
                {this.state.users.map(x =>
                    <li key={x.id}>{x.username}</li>)}
                </ul>
            </div>
        );
    }

    componentDidMount(){

        const endpoint = 'http://localhost:9876/api/users'

        axios.get('http://localhost:9876/api/users')
        .then(response => {
            this.setState({users: response.data})
        })
        .catch(err => console.log(err))
    }
}

export default Users