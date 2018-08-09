import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Login = styled.div`
    width: 100vw
    height: 100vh
    background: linear-gradient(to right, grey, white);
    display: flex
    flex-flow: column
    justify-content: center
    align-items: center
`
const Input = styled.input`
    margin: 0% 0 8% 0;
    width: 220px;
    box-shadow: 3px 4px 10px;
    height: 20px;
`
const Error = styled.div`
    color: red
`

class Signup extends Component {
    state = {
        userName: '',
        password: '',
        department: '',
        error: ''
    }

    inputHandler = (e) => {
        // Handle the input change
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()

        const { userName, password, department } = this.state

        axios.post('http://localhost:8000/api/register', {userName, password, department})
            .then(res => {
                console.log(res)
                const token = res.data

                localStorage.setItem('jwt', token)
                this.props.history.push('/users')

            })
            .catch(err => {
                console.log("Axios failed", err.response)
                this.setState({userName: '', password: '', department: '', error: err.response.data.error})
            })
    }

    render() {
    return (
        <Login className="Signin">
            <h1>Please Sign Up to Continue</h1>
            <form onSubmit={this.submitHandler}>
                <div> 
                    <Input type="text"
                            name="userName" 
                            placeholder="User Name"
                            value={this.state.userName} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <Input type="password" 
                            name="password"
                            placeholder="Password"
                            value={this.state.password} 
                            onChange={this.inputHandler} />
                </div>
                <div> 
                    <Input type="text"
                            name="department" 
                            placeholder="Department"
                            value={this.state.department} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>

                {this.state.error ? (
                    <Error>{this.state.error}</Error>
                 ) : null}
            </form>
        </Login>
    );
  }
}

export default Signup;
