import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(45,45,45,0.2);
    justify-content: space-around;
    align-items: center;
    width: 400px;
    height: 400px;
    margin: 50px auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    padding: 0 50px;
    font-family: 'Lora', Serif;
    font-Size: 14px;
`

const Heading = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(45,45,45,0.1);
    padding-bottom: 10px;
`

const Header = styled.h3`
    font-family: 'Roboto', Sans-Serif;
    font-size: 48px;
    text-align: left;
    margin: 0;
`

const SubHeader = styled.p`
    margin: 0;
    text-align: left;
`

const Button = styled.button`
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.20);
    width: 150px;
    background: rgb(0, 52, 89);
    color: white;
    border: none;
    width: 250px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        background: rgb(0, 23, 31);
    }

    &:active {
        box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.50);
        transform: translateY(2px);
    }
`

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(45,45,45,0.2);
`

const Warning = styled.p`
    font-size: 16px;
    color: red;
    margin: auto;
    transition-delay: 0.5s;
`

const Text = styled.p`
    font-size: 12px;
    color: rgba(45,45,45,0.7)
`

const StyledLink = styled(Link)`
    text-decoration: none;
    &:visited {
        color: blue;
    }
    &:hover {
        color: #003459;
        font-weight: bold;
    }
    
`

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            },
            wrongCredentials: false
        }
    }

    changeHandler = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }

    submitHandler = async (e, user) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', user);
            const token = response.data;
            localStorage.setItem('token', token);
            this.props.history.push('/users');
        } catch (error) {
            this.setState({ wrongCredentials: true });
        }
    }

    render() {
        const warning = <Warning>Invalid credentials. Please try again.</Warning>;
        const signupLink = <StyledLink to='/signup'>Sign up</StyledLink>
        return (
            <div>
                <Form className="login-form" onSubmit={(e) => this.submitHandler(e, this.state.user)}>
                    <Heading>
                        <Header>Welcome</Header>
                        <SubHeader>Sign in to your account</SubHeader>
                    </Heading>
                    <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        required
                        onChange={this.changeHandler}
                    />

                    <Input
                        name="password"
                        type="text"
                        placeholder="Password"
                        value={this.state.password}
                        required
                        onChange={this.changeHandler}
                    />

                    <div>
                        <Button type="submit">Sign In</Button>
                        <Text>Don't have an account? {signupLink}</Text>
                    </div>
                </Form>
                {this.state.wrongCredentials ? warning : null}
            </div>
        );
    }
}

export default Login;