import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class registerLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            race: '',
            type: null
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
        console.log(user)
    }

    render() { 
        return (
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
        )
    }
}
 
export default registerLoginForm;