import React from 'react';


class Signin extends React.Component
{
    state = {
        username: 'sam',
        password: 'mellon'
    };

    render()
    {
        return (
            <form onSubmitt={this.submitHandler}>
                <div>
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
                    <button>SignIn</button>
                </div>
            </form>
                
        );
    }
    submitHandler = () =>
    {
        
    }
}
