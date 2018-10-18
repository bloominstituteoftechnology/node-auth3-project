import React, {Component} from 'react';
import axios from 'axios';

export default function Login(props) {
    return (
       <form onSubmit={props.handleSubmit}>
           <div>
               <label htmlFor="username">
                   Username
               </label>
               <input type="text" />
           </div>
           <div>
               <label htmlFor="password">
                   Password
               </label>
               <input type="password" />
           </div>
           <div>
               <button type="submit">Signin</button>
           </div>
       </form> 
    );
}