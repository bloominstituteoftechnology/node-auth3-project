import React from 'react'
import axios from 'axios'

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        race: ''
    }

render() {
    return (
        <form onSubmit={this.submitHandler}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={this.state.username}
                    name="username"
                    onChange={this.inputChangeHandler}
                    />
                </div>
                <div>
                    <label>Race</label>
                    <input 
                        type="text"
                        value={this.state.race}
                        name="race"
                        onChange={this.inputChangeHandler} 
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.inputChangeHandler} 
                    />
                </div>
                <div>
                <button type="submit"> Signin</button>
                </div>
        </form>
        )
    }
    submitHandler = (event) => {
        event.preventDefault()

        axios.post('http://localhost:5500/api/auth/register', this.state)
            .then(response => {
                console.log(response, 'response from register post')
                localStorage.setItem('token', response.data.token) // setting the token as an item on the window's localStorage
                this.props.history.push('/signin'); // using the redirection abilities of react-router to send user to the /users page
            }).catch( err => {
                console.log(err) // if credentials are invalid, destroy token
            })
    }
    inputChangeHandler = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
}

export default Register