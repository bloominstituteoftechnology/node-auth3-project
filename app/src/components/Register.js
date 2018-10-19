import React from 'react';
import axios from 'axios';

class Register extends React.Component{
    state = {
        username: '',
        department: '',
        password: ''
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='username'>
                            Username
                        </label>
                        <input
                            type='text'
                            name='username'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='department'>
                            Department
                        </label>
                        <input
                            type='text'
                            name='department'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type='submit'>
                        Register
                    </button>
                </form>
            </div>
        )
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const endpoint = 'http://localhost:8000/api/register';
        axios
            .post(endpoint, this.state)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.error('ERROR', error));
    }
}

export default Register;