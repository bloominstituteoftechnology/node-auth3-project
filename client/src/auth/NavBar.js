import React from  'react';
import {NavLink} from 'react-router-dom';


function NavBar(props) {

   const logout = () => {
      localStorage.removeItem('jwt');
    }
   return(
       
      <div>
        <NavLink 
        to='/login' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}>
        Login
        </NavLink>

        <NavLink  
        to='/register' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}>
        Sign Up
        </NavLink>

        <NavLink  
        to='/users' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}>
        Users
        </NavLink>
        
        <NavLink 
        to='/login' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}
        onClick={logout}>
         Logout
         </NavLink>
      </div>
    
   )
      
  }
  
  export default NavBar;