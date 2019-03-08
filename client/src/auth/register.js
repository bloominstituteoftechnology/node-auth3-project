import axios from 'axios'
import React, {Component} from 'react'

export default class Register extends Component {
    state ={
        username: '',
        password: ''
    }

    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = e => {
        e.preventDefault()
        const endpoint = 'http://localhost:5000/api/register';

        axios.post(endpoint, this.state)
        .then(res => {
            this.props.history.push('/login');
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} autoComplete="off">

                    <label htmlFor='username' />
                        <input 
                        name='username' 
                        placeholder="Username"
                        id='username' 
                        value={this.state.username} 
                        type='text' 
                        onChange={this.handleInput} />

                    <label  htmlFor='password'/>
                        <input 
                        name='password' 
                        placeholder="Password"
                        id='password' 
                        value={this.state.password} 
                        type='password'
                        onChange={this.handleInput} />

                        <button type='submit'>Sign Up</button>
                    
                </form>
            </div>
        )
    }

}