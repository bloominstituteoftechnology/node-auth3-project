import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                user_name: '',
                password: ''
            },
            success: false
        };
    }

    setVal = (e, val) => {
        let user = { ...this.state.user };
        user[val] = e.target.value;
        this.setState({ user });
    };

    login = e => {
        e.preventDefault();

        axios.post('http://localhost:8080/auth/login', this.state.user, { withCredentials: true })
            .then(response => {
                console.log(response);

                if (response.status === 200) {
                    this.props.history.push("/users");
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { success } = this.state;

        return (
            <form onSubmit={e => this.login(e)}>
                <input type="username" placeholder="Username" onChange={e => this.setVal(e, 'user_name')}/>
                <input type="password" placeholder="Password" onChange={e => this.setVal(e, 'password')}/>
                <button type="submit">Submit</button>

                {success && <h4>SUCCESS</h4>}
            </form>
        );
    }
}

export default withRouter(Login);