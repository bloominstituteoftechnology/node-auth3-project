import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: '',
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }
    submit = e => {
        e.preventDefault();
        
    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <div>
                    <label>Username</label>
                    <input 
                        type = 'text'
                        name = 'username'
                        placeholder = 'username'
                        value={this.state.username}
                        onChange = {this.handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type = 'password'
                        name = 'password'
                        placeholder = 'password'
                        value = {this.state.password}
                        onChange = {this.handleChange}
                    />
                </div>
                <div>
                <input type = 'text'
                name = 'department'
                placeholder = 'department'
                value={this.state.department}
                onChange = {this.handleChange}
                />
                </div>
                <button type='submit'>Register</button>
            </form>
        );
    }
};

export default Signup;