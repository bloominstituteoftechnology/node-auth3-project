import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {

constructor(){
        super();
}




 render() {
    return (
      <div>
        <div>
                <h1>Welcome</h1><br />
                <Link to="/register">Register</Link><br /><br />
                <Link to="/Login">Login</Link>
           </div>
      </div>
    );
  }

}

export default Home;
