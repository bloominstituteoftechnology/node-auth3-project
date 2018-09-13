import React from 'react';
import axios from 'axios';

class UserList extends React.Component{
    constructor() {
        super();
        this.state={
            users:[],
            loading:true
        }
    }
    componentDidMount() {
        const token=localStorage.getItem('jwt');
        const reqOptions={
            headers:{
            Authorization:token
            }
        }
        axios.get('http://localhost:9000/api/users',reqOptions)
        .then(res=>this.setState({users:res.data,loading:false}))
        .catch(err=>console.log(err));
    }
    render() {
        if (this.state.loading===true) {
            return (
                <div>
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.users.map((e,i)=>
                    <div key={i} className='card'>
                        <p>{e.id}</p>
                        <p>{e.username}</p>
                        <p>{e.department}</p>
                    </div>)}
                </div>
            )
        }
    }
}
export default UserList;