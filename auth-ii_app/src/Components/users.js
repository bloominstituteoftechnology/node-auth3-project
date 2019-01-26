import React from 'react';
import axios from 'axios';

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const endPoint = "http://localhost:5555/api/users";
        const options={
            headers:{
                Authorization: token
            }
        }
        axios.get(endPoint, options).then(res=>{
            this.setState({users:res.data})
        }).catch(err=>{
            console.log('Your Error', err)
        })
    }
    render(){
        return(
            <div>
                <h2>User List</h2>
                <ul>
                    {this.state.users.map(u=>(
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default Users;