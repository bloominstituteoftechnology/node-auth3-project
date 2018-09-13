import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

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
    signOut=()=>{
        localStorage.removeItem('jwt');
        this.props.history.push('/');
    }
    render() {
        if (this.state.loading===true) {
            return (
                <div>
                    <h1>Sign in to access this content.</h1>
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
                    <button onClick={this.signOut} className='btn waves-effect waves-light'>Sign Out</button>
                </div>
            )
        }
    }
}
export default withRouter(UserList);