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
        const token = localStorage.getItem('jwt');
        const endpoint = 'http://localhost:9876/api/users';
        const options = {
         headers: {
             Authorization: token
         }
     }

        axios.get(endpoint, options)
        .then(res=>{
            console.log(res.data);
            this.setState({ users: res.data})
        })
    }
}

export default Users