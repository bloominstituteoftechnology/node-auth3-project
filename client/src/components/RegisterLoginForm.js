import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class RegisterLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            race: '',
            type: '',
            submitted: false
        }
    }

    componentDidMount() {
        const path = this.props.match.path;
        if (path === '/signup') {
            this.setState({ type: "Sign up" })
        } else if (path === '/signin') {
            this.setState({ type: "Sign in" })
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
                this.setState({ submitted: true })
                localStorage.setItem("authorization", user.data.token)
                //console.log(user)
                //console.log(localStorage)
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
            race: '',
            submitted: false
        })
    }

    render() { 
        return (
            this.state.submitted ? (
                <Redirect to="/users"/>
            ) : (
                this.state.type === "Sign up" ? (
                    <Form className="register-login" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input id="username" name="username" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" name="password" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="race">Race</Label>
                            <Input id="race" name="race" onChange={this.handleChange}/>
                        </FormGroup>
                        <Button>{this.state.type}</Button>
                    </Form>
                ) : (
                    <Form className="register-login" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input id="username" name="username" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" name="password" onChange={this.handleChange}/>
                        </FormGroup>
                        <Button>{this.state.type}</Button>
                    </Form>
                )
            )   
        )
    }
}
 
export default RegisterLoginForm;