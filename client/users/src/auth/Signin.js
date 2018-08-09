import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
    state = {
        userName: '',
        password: '',
    }

    inputHandler = (e) => {
        // Handle the input change
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/login', this.state)
            .then(res => {
                console.log(res)
                const token = res.data

                localStorage.setItem('jwt', token)
                this.props.history.push('/api/users')

            })
            .catch(err => {
                console.error("Axios failed", err)
                this.setState({username: '', password: ''})
            })
    }

    render() {
    return (
        <div className="Signin">
            <h1>Signin Component</h1>
            <form onSubmit={this.submitHandler}>
                <div> 
                    <input type="text"
                            name="userName" 
                            value={this.state.username} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <input type="password" 
                            name="password"
                            value={this.state.password} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>
            </form>
        </div>
    );
  }
}

export default Signin;
