import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function homeLink() {
    return (window.location.href = "/");
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            race: '',
            loggedIn: false,
            error: false,
            errorMessage: ''
        };
    }


    register = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            race: this.state.race
        };
        axios.post("http://localhost:5500/api/auth/register", user).then(response => {
            this.props.history.push(`/`)
            // window.location.href = "/"
            this.setState({
                error: false
            });
        })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    errorMessage: err.response.data.error
                })
            })
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="App">
                <h2>Sign Up </h2>
                <div className={this.state.error ? "error" : "hidden"}>
                    {this.state.errorMessage}
                </div>
                <div className='signup-form'>
                    <div className="form-group">
                        <input className="form-control" placeholder="Username" name='username' type="text" value={this.state.username} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Password" name='password' type="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Race" name='race' type="text" value={this.state.race} onChange={this.handleInputChange} />
                    </div>
                    <div className='signup-buts'>
                        <button type="submit" className="signup-button" onClick={this.register}>
                            Submit
                        </button>
                        <Link to="/">
                            <button className="home-button">
                                Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupForm;