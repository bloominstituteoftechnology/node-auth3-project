import React from "react";

const initialUser = {
    username: "",
    password: ""
};

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ""
        }
    }

    submitHandler = () => {}

    render() {
        return (
            <section>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={this.state.user.username} 
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id="password" 
                        name="password" 
                        value={this.state.user.password} 
                    />
                </form>
                { this.state.message ? 
                    (<h4>{this.state.message}</h4>) : 
                    undefined }
            </section>
        );
    }
}