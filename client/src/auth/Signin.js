import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'danfrrr14',
            password: 'corvette'
        }
    }

    render() {
        return (
            <form onSubmit={event => this.submitHandler(event)}>
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.username} 
                        onChange={event => this.inputChangeHandler(event)} 
                        name="username" 
                        type="text" 
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={this.state.password} 
                        onChange={event => this.inputChangeHandler(event)} 
                        name="password" 
                        type="password"
                        />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>
            </form>
        )
    } 

    submitHandler = event => {
        event.preventDefault();
        axios.post('http://localhost:3300/api/login', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.props.history.push('/users');
            })
            .catch(err => {
                console.log(err);
            });
    }

    inputChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
}

export default Signin;