import React, {useState, useEffect} from "react";
import {  axiosWithAuth}  from "../util/axiosWithAuth.js"


function Users () {
    const [neo, setNeo] = useState(0);
    // console.log(posts)
  
  
  
    useEffect(() => {
      
        axiosWithAuth()
        .get("http://localhost:4000/api/users")
          .then(response => {
          console.log(response);
          setNeo(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);
    if (!neo) {
      return <div>Loading ... </div>;
    }
  
    return (
      <div className="App">
       <a href="/logout">Logout</a>    
  <h1>Users</h1>
  
       {neo.map(asteroids => {
          
        return  <div key={asteroids.id}>
       
          
         <p>username: {asteroids.username}</p>
         <p>Password  = {asteroids.password}</p>
         </div>
       })}
      </div>
    );
  }
  
  export default Users;