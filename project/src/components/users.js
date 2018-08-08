import React, { Component } from 'react';

import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super();
        this.state = { 
            users:[],
         }
    }

    componentWillMount() {
        this.getData();
        
      }
    
      
      getData = () => {
        axios
            .get('http://localhost:3300/api/users')
            .then((response) => {
              this.setState({ projects: response.data })
            })
            .catch(err => console.log(err));
      }

    render() { 
        return ( 
            <h1>Users</h1>
         );
    }
}
 
export default Users;