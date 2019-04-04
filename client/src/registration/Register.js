import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            dept: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:5050/api/auth/register';
    
        axios.post(endpoint, this.state) 
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('err', err);
            })

        this.props.history.push('/login');
    }

    render() {
        return(
            <>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        type="text"
                        />

                    <label htmlFor="password">Password</label>            
                    <input
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        type="text"
                        />

                    <label htmlFor="dept">Department</label>            
                    <input
                        name="dept"
                        id="dept"
                        value={this.state.dept}
                        onChange={this.handleInputChange}
                        type="text"
                        />
                </div>
                
                <div>
                    <button type="submit">Sign Up</button>
                </div>   

                </form>
            </>
        )
    }
}

export default withRouter(Register);
