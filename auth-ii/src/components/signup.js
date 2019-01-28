import React, {Component} from "react";
import axios from "axios";

//signup form
class SignUp extends Component {
   //state saves username and password inputs
   state = {
      username: "",
      password: "",
      department: "",
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <div>
               <label htmlFor="username"> Username </label>
               <input
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInput}
                  type="text"
               />
            </div>
            <div>
            <label htmlFor="password"> Password </label>
               <input
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  type="text"
               />
            </div>
            <div>
            <label htmlFor="department"> Department </label>
               <input
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInput}
                  type="text"
               />
            </div>
            <div>
               <button type="submit">SignUp</button>
            </div>
         </form>
      );
   }

   //tracks user input
   handleInput = event => {
      event.preventDefault();
      const target = event.target;
      this.setState({ [target.name] : target.value});
   }

   //stores user token on submit
   handleSubmit = event => {
      event.preventDefault();
      const creds = this.state;
      const endpoint = "http://localhost:9000/api/register";
      axios.post(endpoint, creds)
         .then(res => {
            console.log(res.data)
            localStorage.setItem("jwt", res.data.token);
         }).catch(err => {
            console.log("error", err)
         })
   }
}

export default SignUp;