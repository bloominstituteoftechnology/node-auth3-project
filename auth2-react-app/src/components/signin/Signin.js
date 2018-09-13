import React from "react";
import axios from "axios";

// export const Signin = props => {
//   return (
//     <div>
//       <div>
//         <h1>Welcome to the Signin page.</h1>
//       </div>
//     </div>
//   );
// };

export class Signin extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  signinHandler = event => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/login", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => console.log("AXIOS ERR", err));
  };
  render() {
    return (
      <form onSubmit={this.signinHandler}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }
}
