import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Jumbotron, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:5050/api/auth/login';

        axios.post(endpoint, this.state) 
            .then(res => {
                localStorage.setItem('token', res.data.token)
            })
            .catch(err => {
                console.log(err);
            })

            this.props.history.push('/users');
    }

    render() {
        return(
            <Jumbotron>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <InputGroup>
                        <InputGroupAddon size='md' addonType='prepend'>
                            Username
                        </InputGroupAddon>

                        <Input
                            name="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            placeholder='username...'
                            type="text"
                            />                    
                    </InputGroup>


                    <InputGroup>
                        <InputGroupAddon size='md' addonType='prepend'>
                            Password
                        </InputGroupAddon>

                        <Input
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            placeholder='password...'
                            type="text"
                            />
                    </InputGroup>         
                </div>
                
                <div>
                    <Button color='warning' type="submit">Login</Button>
                </div>   

                </form>
            </Jumbotron>
        )
    }
}

export default withRouter(Login);
