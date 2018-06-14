import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import NavBar from './NavBar';

class RegisterLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            race: '',
            type: '',
            newUser: false
        }
    }

    componentDidMount() {
        const path = this.props.match.path;
        if (path === '/signup') {
            this.setState({ type: "Sign up", newUser: true})
        } else if (path === '/signin') {
            this.setState({ type: "Sign in", newUser: false })
        }
    }

    createUser = (user) => {
        let type = ''
        if (this.state.type === "Sign up") {
            type = 'register'
        } else {
            type = 'login'
        }
        axios.post(`http://localhost:5500/api/auth/${type}`, user)
            .then( user => {
                localStorage.setItem("authorization", user.data.token)
                this.props.history.push('/users')
            })
            .catch( err => {
                console.log(err)
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password,
            race: this.state.race
        }
        this.createUser(user)
        this.setState({
            username: '',
            password: '',
            race: ''
        })
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <Form className="register-login" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="username" name="username" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" name="password" onChange={this.handleChange}/>
                    </FormGroup>
                    {this.state.newUser && (
                        <FormGroup>
                            <Label for="race">Race</Label>
                            <Input id="race" name="race" onChange={this.handleChange}/>
                        </FormGroup>
                    )}
                    <Button color="primary">{this.state.type}</Button>
                </Form> 
            </React.Fragment> 
        )
    }
}
 
export default RegisterLoginForm;