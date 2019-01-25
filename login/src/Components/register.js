import React from 'react';
import '../App.css';
import Axios from 'axios';


class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            department: '',
            error: false
        }
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    register = (e) => {
        e.preventDefault();
        const endpoint = 'http://localhost:3500/api/register';
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            department: this.state.department
        }

        Axios.post(endpoint, newUser)
            .then(res => {
                this.props.history.push('/login')
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
            <h1>Register for the Authenticator!</h1>
            <form onSubmit={this.register}>
                <div>
                    <input 
                        onChange={this.inputHandler}
                        type ="text" 
                        placeholder="username"
                        value={this.state.username}
                        name="username"
                    ></input>
                </div>

                <div>
                    <input 
                        onChange={this.inputHandler}
                        type ="password" 
                        placeholder="password"
                        value={this.state.password}
                        name="password"
                    ></input>
                </div>

                <div>
                    <input 
                        onChange={this.inputHandler}
                        type ="department" 
                        placeholder="department"
                        value={this.state.department}
                        name="department"
                    ></input>
                </div>

                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
    }
}

export default Register;