import React, { Component } from "react";
import axios from "axios";
class Signup extends Component {
    
        
        state = {
            username: "",
            password: "",
            department: ""
        };
    
  
    handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    };

    signUp = event => {
    event.preventDefault();
    const { username, password, department } = this.state;
    const info = { username, password, department };
    
    axios
      .post("http://localhost:6000/api/register", info)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
      })
      .catch(error => console.error("Error:", error));
     
    this.props.history.push('/users')
	 		
    };
    render() {
        return (
            <div>
             <form onSubmit={this.signup}>
                <input
                    onChange={this.handleInputChange}
                    placeholder="username"
                    value={this.state.username}
                    name="username"
                />
                <input
                    onChange={this.handleInputChange}
                    placeholder="password"
                    value={this.state.password}
                    name="password"
                />
                <input
                    onChange={this.handleInputChange}
                    placeholder="department"
                    value={this.state.department}
                    name="department"
                />
                <button type="submit">Sign up</button>
             </form>
            </div>
        );
    }
}

export default Signup;