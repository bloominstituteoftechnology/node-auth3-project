import React, {Component} from "react";
import axios from "axios";

//user component
class Users extends Component {
   //state tracks users
   state = {
      users: []
   }

   //map current users to UI
   render() {
      return (
         <div>
            <h2>List of Users</h2>
            <ul>
               {this.state.users.map(user => (
                  <li key={user.id}>{user.username}</li>
               ))}
            </ul>
         </div>
      )
   }

   componentDidMount() {
      //grab access token from local storage
      const token = localStorage.getItem("jwt");
      const endpoint = "http://localhost:9000/api/users";

      //grab tokens for authorization
      const options = {
         headers: {
            Authorization: token
         }
      };

      //authorize access using token
      axios.get(endpoint, options)
         .then(res => {
            console.log("users", res.data)
            this.setState({users: res.data})
         }).catch(err => {
            console.log("user error", err)
         })
   }
}