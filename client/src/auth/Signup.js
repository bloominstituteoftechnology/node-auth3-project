import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component{
    state={
        username: "",
        password: "",
        department: "",
    }

    render(){
        return (
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}>
                    </input>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}>
                    </input>
                </div>

                <div>
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={this.state.department}
                        onChange={this.handleInputChange}>
                    </input>
                </div>

                <div>
                    <button type = "submit">Register</button>
                </div>
            </form>
        )
    }

    handleInputChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        const userInfo = this.state;
        const endpoint = 'http://localhost:6789/api/register'
        axios.post(endpoint, userInfo)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export default Signup

