import React from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
    username: '',
    password: '',
};

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: '',
        }
    }

    inputHandler =(event) => {
        const { name, value } = event.target;
        this.setState({ user: {...this.state.user, [name]:value }})
    }
    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/register`, this.state.user)
        .then(res => {
            if (res.status === 201) {
                this.setState({
                    message: 'Registration Successful',
                    user: {...initialUser },
                })
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            this.setState({
                message: 'Registration Failed',
                user: {...initialUser },
            })
        });
    }


    render() {
    return(
        <section className="register-container">
        <form className='register-form' onSubmit={this.submitHandler}>
        <label htmlFor="username">Username</label>
        <input 
            type="text"
            placeholder='Type your new username...' 
            id="username" 
            name="username" 
            value={this.state.user.username} 
            onChange={this.inputHandler}
        />
        <label htmlFor="password">Password</label>
        <input 
            type="text"
            placeholder='Type your new password...' 
            id="password" 
            name="password" 
            value={this.state.user.password} 
            onChange={this.inputHandler}
        />
        <label htmlFor="department">Department</label>
         <input 
            type="text"
            placeholder='Department' 
            id="department" 
            name="department" 
            value={this.state.user.department} 
            onChange={this.inputHandler}
        />
        <button type="submit">Submit</button>
        </form>

        { this.state.message
            ? (<h4>{this.state.message}</h4>)
            : undefined
        }
        </section>
    )
    }
};

