import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component { 
    render() {
        return(
            <div>
                <h2>List of users</h2>
            </div>
        );
    }

    componentDidMount(){
        const endpoint = 'http://localhost:9876/api/users'

        Axios.get(endpoint).then(res=>{
            console.log(res.data)
        }).catch(err => {
            console.log(`error, couldn't get users`)
        })
    }
}

export default Users