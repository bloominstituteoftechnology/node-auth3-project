import axios from 'axios';
import React from 'react';

class SignUp extends React.Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            department:''
        }
    }
    onChangeHandler=(event)=>{
        return this.setState({[event.target.name]:event.target.value});
    }
    onSubmitHandler=()=>{

    }
    render() {
        return (
            <div>
                <input type='text' name='username' value={this.state.username} placeholder='Enter a username' onChange={this.onChangeHandler}/>
                <input type='password' name='password' value={this.state.password} placeholder='Enter a password' onChange={this.onChangeHandler}/>
                <input type='text' name='department' value={this.state.department} placeholder='Enter a department' onChange={this.onChangeHandler}/>
                <button type='submit' className='btn waves-effect waves-light' onSubmit={this.onSubmitHandler}>Sign Up</button>
            </div>
        )
    }
}
export default SignUp;