import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  editInputHandler = e => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitInput = e => {
    e.preventDefault();
    console.log("state", this.state);
    //axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:8000/api/login", this.state)
      .then(res => {
        const token = res.data;
        console.log("data", res.data);
        localStorage.setItem("jwt", token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.error("axios failed");
      });
  };

  render() {
    return (
      <div>
        <h1>signin</h1>
        <form onSubmit={this.handleSubmitInput}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.editInputHandler}
            placeholder="please input username"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.editInputHandler}
            placeholder="please input password"
          />
          <button type="submit">SignIn</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);

// const SignIn = () => {
//   return (
//     <div>
//       <h1>signin</h1>
//     </div>
//   );
// };

// export default SignIn;
