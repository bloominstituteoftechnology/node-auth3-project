import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { Jumbotron, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            dept: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:5050/api/auth/register';
    
        axios.post(endpoint, this.state) 
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('err', err);
            })

        this.props.history.push('/login');
    }

    render() {
        return(
            <Jumbotron>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>

                <div>
              
                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>Username</InputGroupAddon>

                        <Input
                            name="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            placeholder='username'
                            type="text"
                            />
                    </InputGroup>
         
                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>Password</InputGroupAddon>
                        <Input
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            placeholder='Password...'
                            type="text"
                            /> 
                    </InputGroup>
           
                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>Dept</InputGroupAddon>

                        <Input
                            name="dept"
                            id="dept"
                            value={this.state.dept}
                            onChange={this.handleInputChange}
                            placeholder='Department...'
                            type="text"
                            />
                    </InputGroup>
                </div>
                
                <div>
                    <Button color='warning' type="submit">Sign Up</Button>
                </div>   

                </form>
            </Jumbotron>
        )
    }
}

export default withRouter(Register);
