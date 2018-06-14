import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    state = {
        username: '',
        password: ''
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.username} 
                        onChange={this.inputChangeHandler}
                        name='username' 
                        type='text' />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={this.state.password} 
                        onChange={this.inputChangeHandler}
                        name='password' 
                        type='password' />
                </div>
                <div>
                    <button type='submit'>Signin</button>
                </div>
            </form>
        );
    }

submitHandler = event => {
        event.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:5500/api/auth/login', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.props.history.push('/users');
                console.log('signing props', this.props)
            })
            .catch(error => console.log('grumpy goose'))
    }

inputChangeHandler = event => {
    console.log('Change', event.target.name);
    const { name, value } = event.target;

    this.setState({ [name]: value })
}

}



export default Signin;