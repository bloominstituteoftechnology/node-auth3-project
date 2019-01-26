import React from 'react';
import '../App.css';
import Axios from 'axios';
import { Input, Button } from './styledComponents';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (e) => {
        e.preventDefault();
        const endpoint = 'http://localhost:3500/api/login';
        const loginUser = {
            username: this.state.username,
            password: this.state.password
        }

        Axios.post(endpoint, loginUser)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem('department', res.data.department);
                this.props.history.push('/users')
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            })
    }

    render(){
    return(
        <div>
            <h1>Login to the Authenticator!</h1>
            <form onSubmit={this.login}>
                <div>
                    <Input 
                        onChange={this.inputHandler}
                        type ="text" 
                        placeholder="username"
                        value={this.state.username}
                        name="username"
                    ></Input>
                </div>

                <div>
                    <Input 
                        onChange={this.inputHandler}
                        type ="password" 
                        placeholder="password"
                        value={this.state.password}
                        name="password"
                    ></Input>
                </div>

                <div className="button">
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
    }
}

export default Login;