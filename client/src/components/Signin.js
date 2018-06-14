import React from 'react'
import axios from 'axios'

class Signin extends React.Component {
    state = {
        username: '',
        password: ''
    }

render() {
    return (
        <form onSubmit={this.submitHandler}>
            <div>
                <input
                    type="text"
                    value={this.state.username}
                    name="username"
                    onChange={this.inputChangeHandler}
                    />
                <label htmlFor="username" />
                </div>
                <div>
                    <input 
                        type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.inputChangeHandler} 
                        />
                    <label htmlFor="password" />
                </div>
                <div>
                <button type="submit"> Signin</button>
                </div>
        </form>
        )
    }
    submitHandler = (event) => {
        event.preventDefault()

        axios.post('http://localhost:5500/api/auth/login', this.state)
            .then(response => {
                localStorage.setItem('token', response.data.token) // setting the token as an item on the window's localStorage
                // this.props.history.push('/users'); // using the redirection abilities of react-router to send user to the /users page
            }).catch( err => {
                console.log('sad')
            })
    }
    inputChangeHandler = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
}

export default Signin