import axios from 'axios';
import React from 'react';
import {withRouter} from 'react-router-dom';

class SignIn extends React.Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }
    onChangeHandler=(event)=>{
        return this.setState({[event.target.name]:event.target.value});
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();
        const user={
            username:this.state.username,
            password:this.state.password
        }
        axios.post('http://localhost:9000/api/login',user)
            .then(res=>{
                localStorage.setItem('jwt',res.data);
                this.props.history.push('/users')
            })
            .catch(err=>console.log(err));
    }
    redirect=()=>{
        this.props.history.push('/signup');
    }
    render() {
        return (
            <form>
                <h1>Sign In</h1>
                <input type='text' name='username' value={this.state.username} placeholder='Enter a username' onChange={this.onChangeHandler}/>
                <input type='password' name='password' value={this.state.password} placeholder='Enter a password' onChange={this.onChangeHandler}/>
                <div className='btn-container'>
                <button type='submit' className='btn waves-effect waves-light' onClick={this.onSubmitHandler}>Sign In</button>
                <button type='button' className='btn waves-effect waves-light' onClick={this.redirect}>Don't have an account?</button>
                </div>
            </form>
        )
    }
}
export default withRouter(SignIn);