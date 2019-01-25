import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SignInPage = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 36px;
    }
`;

const InputSection = styled.div`
    display: flex;
    justify-content: center;
    width: 400px;
    margin: 15px 0px;
    font-size: 18px;

    label{
        text-align: right;
        padding-right: 8px;
        margin: 3px 0px;
        width: 100px;
    }
`;

const SubmitButton = styled.div`
    font-size: 24px;

    button{
        background-color: white;
        padding: 5px 10px;
        border-radius: 5px;

        &:hover{
            color: white;
            background-color: black;
            cursor: pointer;
        }
    }
`;

const WarningMessage = styled.div`
    font-size: 26px;
    margin-top: 20px;
`;

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            failedSignin: false
        };
    }

    submit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3300/api/login', this.state)
        .then(res=>{
            localStorage.setItem('jwt', res.data.token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('department', res.data.department);
            this.props.history.push('/users');
        })
        .catch(error=>{
            this.setState({
                failedSignin: true
            })
        })
    }

    handleInput = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
        <SignInPage onSubmit={this.submit}>
            <h1>Sign In</h1>
            <InputSection>
                <label>Username:</label>
                <input type="text" name="username" onChange={this.handleInput} placeholder=" Enter username..." value={this.state.username}></input>
            </InputSection>
            <InputSection>
                <label>Password:</label>
                <input type="password" name="password" onChange={this.handleInput} placeholder=" Enter password..." value={this.state.password}></input>
            </InputSection>
            <SubmitButton>
                <button type="submit">Sign In</button>
            </SubmitButton>
            <WarningMessage>
                {this.state.failedSignin ? 'Please include a valid username or password' : null}
            </WarningMessage>
        </SignInPage>
        );
    }
}

export default SignIn;