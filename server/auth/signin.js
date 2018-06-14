import React from 'react';

classSignin extends React.Component {
    state = {
        username: '',
        password: ''
    };

    render() {
        return (
            <form onSubmitHadler={this.submitHandler}>
                <div>
                    <input value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text" />
                    <label htmlForm="username" />
                </div>
                <div>
                    <input value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text" />
                    <label htmlForm="password" /> 
                </div>
                </form>
                    
        )
    }
}