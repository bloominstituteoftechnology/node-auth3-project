import React, { Component } from 'react';
import NavBar from './navBar';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <NavBar />
                <h3>Welcome to your Dashboard</h3>
               <br />
               <br />
            <h4>Projects</h4>
            <h4>Profile</h4>
            <h4>Account Settings</h4>
               
                </div>


         )
    }
}
 
export default Dashboard;