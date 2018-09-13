import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    changeHandler = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    submitForm = (event) => {
        event.preventDefault();
        axios.post('http://localhost:7001/api/register', this.state)
            .then(response => {
                console.log('response from register', response);
                localStorage.setItem('username', this.state.username)
            })
            .catch(err => console.log(err))
        this.props.history.push('/users');
    }

    render() {
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.submitForm} method="post">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler}/>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                    <input type="text" name="department"  placeholder="Department" value={this.state.department} onChange={this.changeHandler}/>
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

export default Register;