import React from  'react';
import {NavLink} from 'react-router-dom';

function NavBar(props) {

   return(
       <div>
   
        <NavLink 
        to='/login' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}>
        Login
        </NavLink>

        <NavLink  
        to='/signup' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}>
        Sign Up
        </NavLink>

        <NavLink  
        to='/users' 
        style={{ color: 'black', textDecoration: 'none', padding: '10px' }}>
        Users
        </NavLink>
          
      </div>
    
   )
      
  }
  
  export default NavBar;