import React from "react";
import axios from "axios";

class Register extends React.Component {
    state = {
        username: "",
        password: "",
        race: ""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5500/api/auth/register', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.props.history.push('/users');
            })
            .catch(err => console.log(err));
    }

    render() {
        const { username, password, race } = this.state;
        return (
            <div>
                <form>
                    <h3>Register</h3>
                    <input type="text" name="username" value={username} placeholder="username" onChange={this.handleChange}/>
                    <input type="text" name="race" value={race} placeholder="race" onChange={this.handleChange}/>
                    <input type="password" name="password" value={password} placeholder="password" onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Register;