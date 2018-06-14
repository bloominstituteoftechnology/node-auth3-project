import React from "react";
import axios from "axios";

class Users extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }

        axios.get('http://localhost:5500/api/users', requestOptions).then(response => {
            console.log(response.data)
        })
    }

    render() { 
        return ( <div></div> )
    }
}
 
export default Users;