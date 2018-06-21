import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    state = {
        username: 'tinaturner',
        password: '12345'
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.usermame} 
                        onChange={this.inputChangeHandler} 
                        name="username"
                        type="text"
                        />
                        <label htmlFor="username" />
                </div>
                <div>
                    <input 
                        value={this.state.usermame} 
                        onChange={this.inputChangeHandler} 
                        name="password"
                        type="password"
                        />
                        <label htmlFor="username" />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>            
            </form>
        );
    }
    //submit the form
    submitHandler = event => {
        event.preventDefault();
        
        axios
            .post('http://localhost:5500/api/auth/login', this.state)
            .then(response => {
            console.log('response', response.data);
        })
        .catch(err => console.log('bad panda!'));
    };
    
    inputChangeHandler = event => {
        console.log('changing', event.target.name)
        const { name, value } = event.target;

        this.setState({[name]: value })
        };
}

export default Signin;

