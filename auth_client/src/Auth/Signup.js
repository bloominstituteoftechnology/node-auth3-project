import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
class Signup extends Component {
    state = {
        username: "",
        department: "",
        password: ""
    };
  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const credentials = this.state;
    const endpoint = "http://localhost:4500/api/register";
    axios
      .post(endpoint, credentials)
      .then(res => {
        this.setState({
          username: this.state.username,
          department: this.state.department,
          password: this.state.password
        });
        this.props.history.push("/signin");
      })
      .catch(err => {
        console.log("err from login", err);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="department">department</label>
          <input
            name="department"
            value={this.state.depeartment}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
          >
            Sign Up
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(Signup);
