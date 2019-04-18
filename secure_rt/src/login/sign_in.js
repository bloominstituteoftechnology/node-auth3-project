import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
        users: ''
    };


    render() {
        console.log('You are in the Signin page!');
        return (
        <div>
        <h2>Login</h2>
            <form onSubmit={this.signin}>
                <h3>Welcome Back!<br/>Please Sign into your Account!</h3>
                <div>
                    <label htmlFor="username" />
                    <input
                        type='text'
                        id='username'
                        placeholder='username'
                        name='username'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" />
                    <input 
                        type='password'
                        id='password'
                        placeholder='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                <label htmlFor="department" />
                    <input 
                        type='text'
                        id='department'
                        placeholder='department'
                        name='department'
                        value={this.state.department}
                        onChange={this.handleInputChange}
                    /> 
                </div>
                <div>
                <button type='submit'>
                    <Loader type="ThreeDots" color="green" height='12' width='37' /> Login
                </button> 
                </div> 
            </form>
        </div>
        )
    }

    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    signin = e => {
        e.preventDefault();
        //const endpoint = `${process.env.API_URL}/api/auth/login`;
        const endpoint = 'http://localhost:7000/api/auth/login';

        axios
            .post(endpoint, this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                console.log(res.data)
                this.props.history.push('/users');
            })
            .catch(err => console.log(err));
    };
}    

export default Login;