import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
    state = {
        username: '',
        password: '',
        department: ''
    }

    submit = e => {
       const body = this.state
       e.preventDefault(); 

       axios
        .post('http://localhost:3300/api/register', body)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        this.setState({ username: '', password: '', department: '' })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        return (
            <div>
                <h1>Register</h1>
                <form className='form'>
                    <div className='inputs'>
                        <input placeholder='username' name='username' value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className='inputs'>
                        <input placeholder='password' name='password' value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className='inputs'>
                        <input placeholder='department' name='department' value={this.state.department} onChange={this.handleChange} />
                    </div>
                    <button onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;