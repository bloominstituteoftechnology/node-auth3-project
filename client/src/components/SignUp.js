import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            department: '',
            userExists: false
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    register = () => {
        if (this.state.username === '' || this.state.password === '' || this.state.department === '') {
            alert('Please enter a username, password, and department');
            return;
        }

        const user = { username: this.state.username, password: this.state.password, department: this.state.department }

        axios
            .post('http://localhost:8000/api/register', user)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/users')
            })
            .catch(err => {
                if (!err || !err.response.status) return;
                if (err.response.data.errorMessage === 'There is already a user with that name.') {
                    this.setState({ userExists: true })
                }
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className='register-container'>
                <form className='register-form' onSubmit={event => event.preventDefault()}>
                    <h1>Register</h1>
                    <input type='text' placeholder='Username' name='username' value={this.state.username} onChange={this.handleInput} />
                    <input type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleInput} />
                    <input type='text' placeholder='Department' name='department' value={this.state.department} onChange={this.handleInput} />
                    <button onClick={this.register}>Sign Up</button>
                    {this.state.userExists ? <p>User with that name already exists!</p> : null}
                </form>
            </div>
        );
    }
}

export default SignUp;
