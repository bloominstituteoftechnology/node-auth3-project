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
        this.props.history.push('/signin');
    }
    signUp=()=>{
        this.props.history.push('/signup');
    }
    signIn=()=>{
        this.props.history.push('/signin');
    }
    render() {
        if (this.state.loading===true) {
            return (
                <div>
                    <h1>Sign in to access this content.</h1>
                    <div className='btn-container'>
                        <button onClick={()=>this.signUp()} className='btn waves-effect waves-light'>Go to Sign Up Page</button>
                        <button onClick={()=>this.signIn()} className='btn waves-effectd waves-light'>Go to Sign In Page</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Users in {this.state.users[0].department} department:</h1>
                    {this.state.users.map((e,i)=>
                    <div key={i} className='card'>
                        <p className='text-flow'>User Id: {e.id}</p>
                        <p className='text-flow'>Name: {e.username}</p>
                        <p className='text-flow'>Department: {e.department}</p>
                    </div>)}
                    <button onClick={this.signOut} className='btn waves-effect waves-light'>Sign Out</button>
                </div>
            )
        }
    }
}
export default withRouter(UserList);