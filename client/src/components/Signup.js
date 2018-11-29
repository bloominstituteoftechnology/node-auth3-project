
import React, { Component } from 'react';
import axios from 'axios';

const initialUser = {
    username: '',
    department: '',
    password: ''
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {...initialUser},
            message: '',
        }
    }

    changeHandler = event => {
        const {name, value} = event.target;
        this.setState({
            user: {...this.state.user, [name]: value}
        })
    }

    signUp = event => {
        event.preventDefault();
        const {username, password, department} = this.state.user;
        if (!username || !department || !password) {
            alert("Please enter a username, department, and password");
        } else {
            axios.post('http://localhost:9000/api/register', this.state.user)
                .then(res => {
                    if (res.status === 201) {
                        this.setState({
                            message: 'Registration successful',
                            user: {...initialUser}                        
                        })
                    } else {
                        throw new Error('Something is wrong.');
                    }
                })
                .catch(err => {
                    this.setState({
                        message: 'Registration failed.',
                        user: {...initialUser}  
                    })
                    console.dir(err);
                });
        }
        event.target.reset();
    }

    render() { 
        return (
            <div>
                <h3>Sign up here!</h3>
                <form onSubmit={this.signUp}>
                    <input type='text' placeholder='username' name='username' value={this.value} onChange={this.changeHandler}/>
                    <input type='text' placeholder='department' name='department' value={this.value} onChange={this.changeHandler}/>
                    <input type='password' placeholder='password' name='password' value={this.value} onChange={this.changeHandler}/>
                    <input type='submit' />
                </form>
                <h4>{this.state.message !== '' ? this.state.message : null}</h4>
            </div>
        );
    }
}
 
export default Signup;