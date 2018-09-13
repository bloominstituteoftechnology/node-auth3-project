import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    submitForm = (event) => {
        event.preventDefault();
        axios.post('http://localhost:7001/api/login', this.state)
            .then(response => {
                console.log('response from login', response.data);
                localStorage.setItem('jwt', response.data.token);
                this.props.setToken(response.data.token)
                localStorage.setItem('username', this.state.username)
            })
            .catch(err => console.log(err))
        
        setTimeout(function() {this.props.history.push('/users')}.bind(this), 1000)
    }

    render() {
        return(
            <div>
                <h1>Log in</h1>
                <form onSubmit={this.submitForm} method="post" className="loginForm">
                    <input type="text" name="username"  placeholder="Username" value={this.state.username} onChange={this.changeHandler}/>
                    <input type="password" name="password"  placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                    <button>Log in</button>
                </form>
            </div>
        )
    }
}

export default Login;