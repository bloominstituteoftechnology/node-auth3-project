import React from 'react';
import axios from 'axios';

class LogIn extends React.Component{
    state = {
        username: '',
        password: ''
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'>
                        Username
                    </label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        name='username'
                    />
                    <button type='submit'>
                        Log in
                    </button>
                </form>
            </div>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        const endpoint = 'http:localhost:8000/api/login';
        axios
            .post(endpoint, this.state)
            .then(response => {
                localStorage.setItem(
                    'jwttoken',
                    response.data.token
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
    }
}

export default LogIn;