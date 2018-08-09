import React, { Component } from 'react';



class Login extends React.Component {
   render () {
     return (
       <div className="sign-in">
         <h1>Log In</h1>
		       <form>
		         <div>
				        <input type='text' name='name' placeholder='name' />
				       	<input type='text' name='password' placeholder='password' />
		            <button type="button" >Log in</button>
		         </div>
		        </form>
       </div>
    )}
}

export default Login;
