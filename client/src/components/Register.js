import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
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

    register = e => {
        e.preventDefault();

        axios.post('http://localhost:8080/auth/register', this.state.user, { withCredentials: true })
            .then((response) => {
                if (response.status === 201) {
                    this.setState({ success: true });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ success: false });
            });
    };

    render() {
        const { success } = this.state;

        return (
            <form onSubmit={this.register}>
                <input type="name" placeholder="Name" onChange={e => this.setVal(e, 'name')}/>
                <input type="email" placeholder="Email" onChange={e => this.setVal(e, 'email')}/>
                <input type="username" placeholder="Username" onChange={e => this.setVal(e, 'user_name')}/>
                <input type="password" placeholder="Password" onChange={e => this.setVal(e, 'password')}/>
                <button type="submit">Submit</button>

                {success && <h4>SUCCESS</h4>}
            </form>
        );

    }
}

export default Register;