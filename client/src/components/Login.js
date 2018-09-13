import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`

    display: flex;
    flex-direction: column;
    max-width: 300px;
    width: 100%;
    margin: 10px auto 0 auto;
    border: 1px solid silver;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);

`
const Input = styled.input`

    margin: 5px 0;
    height: 30px;
    max-width: 200px;
    padding-left: 10px;
    border-radius: 5px;
`
const Text = styled.p`

    color: #fff;
    > a {
        text-decoration: none;
        color: yellow;
    }
    
`

const Button = styled.button`
    
    margin-top: 10px;
    width: 100px;
    border: 1px solid lightgray;
    height: 30px;
    cursor: pointer;
    border-radius: 5px;
    background: silver;
    
`



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                username: '',
                password: ''
            }
         }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.history.replace('/users')
        }
    }

    changeHandler = (event) => {
        this.setState({ user: {
            ...this.state.user,
            [event.target.name]: event.target.value 
        }});
    }

    submitHandler = async (event, user) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', user);
            const token = response.data;
            localStorage.setItem('token', token);
            this.props.history.push('/users');
        } catch (error) {
            console.log(error, 'Something went wrong.')
        }
    }


    render() { 
        
        return ( 
                <Form className="login" onSubmit={(event) => this.submitHandler(event, this.state.user)}>
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
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        required
                        onChange={this.changeHandler}
                    />

                    
                        <Button type="submit">Login</Button>
                        <Text>Don't have an account?  
                        <Link to='/register'> Register</Link>
                        </Text>
                    
                </Form>
         );
    }
}
 
export default Login;