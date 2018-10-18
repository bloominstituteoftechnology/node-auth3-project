import React from "react";
import axios from "axios";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    isRegistering: false,
    error: null
  };
  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    this.setState({ isRegistering: true, error: null });
    axios
      .post("/api/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(resp => {
        if(resp.status === 201) {
          this.setState({ isRegistering: false, username: "", password: "", error: null });
          this.props.history.push("/login");
        } else {
          this.setState({message: resp.data.message});
        }
      }
      )
      .catch(err =>
        this.setState({
          isRegistering: false,
          error: err.response.data.message
        })
      );
  };
  render() {
    return (
      <div>
        {this.state.error ? <h4 style={{background: 'red', color: 'white', textAlign: 'center'}}>{this.state.error}</h4> : null}
        {this.state.isRegistering ? (
          <h4>Registering account...</h4>
        ) : (
          <React.Fragment>
            <h2>Register</h2>
            <input
              onChange={this.handleOnChange}
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              onChange={this.handleOnChange}
              type="password"
              name="password"
              placeholder="password"
            />
            <button onClick={this.handleSubmit} type="submit">
              Register
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Register;
