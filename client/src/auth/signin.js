import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    };

    render() {
        return (
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

        );
    }

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

    inputChangeHandler = event => {
        console.log('changing', event.target.name);
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
}

export default Signin;