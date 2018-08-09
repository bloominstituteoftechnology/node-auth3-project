import React from 'react';
import axios from 'axios'


class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios
            .post('http://localhost:3300/api/login', user)
            .then(response => {
                const token = response.data;
                localStorage.setItem('jwt', token)
                console.log(response)
                console.log(response.data)
            })
            .catch(err => console.error('axios failed', err.response.data))

        this.setState({ username: '', password: '' })
    }
    render() {
        return (
            <div>
                <form>
                    <input
                        className='signin-form'
                        type='text'
                        placeholder='Choose a username...'
                        value={this.state.username}
                        onChange={this.handleChange}
                        name='username'
                    />
                    <div>
                        <input
                            className='signin-form'
                            type='password'
                            placeholder='Choose a password...'
                            value={this.state.password}
                            onChange={this.handleChange}
                            name='password'
                        />
                    </div>
                    <div onClick={this.onSubmit}><button>Sign In</button></div>
                </form>
            </div>
        )
    }
}
export default SignIn