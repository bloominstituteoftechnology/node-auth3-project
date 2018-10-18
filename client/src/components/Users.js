import React, {Component} from 'react';
import axios from 'axios';

export default function Users(props) {
    return (
       <div>
           <h2>List of users</h2>
           <ul>
               props.users.map(u => {
                   <li key={u.id}>u.username</li>
               })
           </ul>
      </div>
    );
}