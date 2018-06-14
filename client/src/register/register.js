import React, { Component } from 'react';
import axios from 'axios';


class register extends Component {
    state = {
        username: '',
        password: '',
        race: ''
    }

    inputChangeHandler = event => {
        console.log('changing', event.target.name);
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    submitHandler = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:5500/api/auth/login', this.state)
            .then(response => {
                console.log(response.data.token)
                localStorage.setItem('jwt', response.data.token);
                console.log('response', this.props);
                this.props.history.push('/users');
            })
            .catch(err => console.log('bad Panda'));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        {/* <label htmlForm="Username" /> */}
                        <label>Username</label>
                        <input value={this.state.username}
                            onChange={this.inputChangeHandler}
                            name="username"
                            type="text"
                        />
                    </div>
                    <div>
                        {/* <label htmlForm="password" /> */}
                        <label>Password</label>
                        <input value={this.state.password}
                            onChange={this.inputChangeHandler}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <button type="submit">Signin</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default register;