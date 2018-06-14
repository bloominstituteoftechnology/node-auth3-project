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
          <div className>
            <form onSubmit={this.submitHandler} className="signupForm">
        
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
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
                        name="password"
                        type="text"
                    />
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>
            </form>
          </div>
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
            })
            .catch(err => console.log('error signing up!'));
    };

    inputChangeHandler = event => {
        const { name, value } = event.trigger; 

        this.setState({ [name]: value });
    };
}

export default Signup; 
