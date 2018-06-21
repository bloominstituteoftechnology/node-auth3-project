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
            <form action="">
                <div>
                    <input
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username" type="text"
                    />
                    <label htmlFor="username" />
                </div>
                <div>
                    <input
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="password" type="password" />
                    <label htmlFor="password" />
                </div>
                <div>
                    <button>SignIn</button>
                </div>
            </form>
                
        );
    }
}
