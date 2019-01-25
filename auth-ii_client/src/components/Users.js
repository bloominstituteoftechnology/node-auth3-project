import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = []
  }
  render() { 
    return ( 
      <div>
        <div>
          <h2>List of Users (when logged in of course)</h2>
        </div>
        <div>
          <Button color='danger'>Sign out</Button>
        </div>
      </div>
    );
  }
}

export default Users;
