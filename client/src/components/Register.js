import React from 'react';

export default function Register(props) {
    return (
       <form onSubmit={props.handleSubmit}>
           <div>
               <label htmlFor="username">
                   Username
               </label>
               <input type="text"
                    name="username"
                    value={props.username}
                    onChange={props.handleChange} />
           </div>
           <div>
               <label htmlFor="password">
                   Password
               </label>
               <input type="password"
                    name="password"
                    value={props.password}
                    onChange={props.handleChange} />
           </div>
           <div>
               <label htmlFor="department">
               Department
               </label>
               <input type="text"
                    name="department"
                    value={props.department}
                    onChange={props.handleChange} />
           </div>
           <div>
               <button type="submit">Signin</button>
           </div>
       </form> 
    );
}