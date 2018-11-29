import React from 'react';
import axios from 'axios';

const initialUser = {
    username : '',
    password : ''
};

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user : {...initialUser},
            message : '',
        };
    }

    /*inputHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }*/
    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
      }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3300/api/register', this.state.user)
             .then(res => {
                    if(res.status === 200) {
                        this.setState({
                            message : 'Registration successful',
                            user : {...initialUser}
                        });
                    } else {
                         throw new Error();
                    }
              })
             .catch(err => {
                    this.setState({
                        message : 'Registration failed',
                        user : {...initialUser}
                    });
              })
    }


    render() {
        return(
            <div className = "register-container">
                <h2>Create A New Account..</h2>

                <form onSubmit = {this.submitHandler}>
                    <label htmlFor = "username">Username : </label>
                    <input
                        type = "text"
                      //  id = "username"
                        name = "username"
                        value = {this.state.user.username}
                        onChange = {this.inputHandler}
                    />

                    <label htmlFor = "password">Password : </label>
                    <input
                        type = "text"
                        id = "password"
                        name = "password"
                        value = {this.state.user.password}
                        onChange = {this.inputHandler}
                    />

                    <button type="submit">Submit</button>
                </form>

                {this.state.message ? (<h4>{this.state.message}</h4>) : undefined }

            </div>
        )
    }
}


export default Register;