import React from 'react';
import axios from 'axios'


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            department: this.state.department
        }

        axios
            .post('http://localhost:3300/api/register', user)
            .then(response => {
                const token = response.data;
                localStorage.setItem('jwt', token)
                console.log(response)
                console.log(response.data)
            })
            .catch(res => console.error('axios failed'))

        this.setState({ username: '', password: '', department: '' })
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
                    <div>
                        <input
                            className='signin-form'
                            type='text'
                            placeholder='Choose a department...'
                            value={this.state.department}
                            onChange={this.handleChange}
                            name='department'
                        />
                    </div>

                    <div onClick={this.onSubmit}><button>Sign Up</button></div>

                </form>
            </div>
        )
    }
}
export default SignUp