import React from 'react';
import Button from './Button'
import { Link } from 'react-router-dom'

class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            race: '',
            password: ''
        };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    logIn = () => {
        return (
            <div className="form">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" onChange={this.handleChange} value={this.state.username} />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
                <Link to="/users"><Button text="Login" function={() => {
                    let user = {
                        username: this.state.username,
                        password: this.state.password
                    }
                    this.props.login(user)
                    setTimeout(() => {
                        this.props.fetch()
                    }, 300)

                }} /></Link>
            </div>
        )
    }
    signUp = () => {
        return (
            <div className="form">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" onChange={this.handleChange} value={this.state.username} />
                <label htmlFor="race">Race</label>
                <input id="race" name="race" onChange={this.handleChange} value={this.state.race} />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
                <Link to="/users"><Button text="Register" function={() => {
                    let user = {
                        username: this.state.username,
                        race: this.state.race,
                        password: this.state.password
                    }
                    this.props.register(user)
                    setTimeout(() => {
                        this.props.fetch()
                    }, 300)
                }} /></Link>
            </div>
        );
    }
    render() {
        console.log(this.props, this.state)
        return (
            <div>
                {this.props.page === "signup" ? this.signUp() : this.logIn()}
            </div>
        );
    }
}


export default InputComponent;
