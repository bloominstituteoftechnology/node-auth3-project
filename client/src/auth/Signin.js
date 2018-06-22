import React from 'react';
import axios from 'axios';


class Signin extends React.Component
{
    state = {
        username: 'sam',
        password: 'mellon',
    };

    render()
    {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <label>Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text"
                    />
                    
                </div>
                <div>
                    <label>Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="password" type="password" />
                
                </div>
                <div>
                    <button type="submit">SignIn</button>
                </div>
            </form>
                
        );
    }
    submitHandler = event =>
    {
        event.preventDefault();

        axios
            .post( 'http://localhost:5500/api/auth/login', this.state )
            .then( response =>
            {
                localStorage.setItem  ('jwt', response.data.token );
                console.log( 'respose', response.data ); 

                this.props.history.push( '/users' );
            } )
            //this.props.history.push( '/users' );
    }; 

    inputChangehandler = event =>
    {   
        const { name, value } = event.target;

        this.setState( { [ name ]: value } );
    };
}

export default Signin;
