import React from 'react'; 
import axios from 'axios'; 
import './signup.css';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        race: ''
    };

    render () {
        return (          
            <form onSubmit={this.submitHandler} className="signupForm">        
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
                        classame="username1"
                        type="text"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="password"
                        type="password"
                    />
                </div>
                <div>
                    <label>Race</label>
                    <input 
                        value={this.state.race}
                        onChange={this.inputChangeHandler}
                        name="race"
                        type="text"
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>          
        );
    }

    submitHandler = event => {
        event.preventDefault();

        axios  
            .post('http://localhost:5500/api/register', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token); 

                console.log('signup props', this.props);
                this.props.history.push('/users');
                response.status(200).json({message: 'Welcome to Middle Earth!'});
            })
            .catch(err => console.log('error signing up!'));
    };

    inputChangeHandler = event => {
        const { name, value } = event.target; 

        this.setState({ [name]: value });
    };
}

export default Signup; 
