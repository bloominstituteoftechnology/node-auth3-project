import React from 'react';
import { Button } from 'reactstrap';

class Main extends React.Component {
  handleButtonClick = () => {
    this.props.history.push('/users');
  };

  render() {
    return (
      <div>
        Welcome to the Database!!
        <br />
        <br />
        <Button onClick={this.handleButtonClick}>Users</Button>
      </div>
    );
  }
}

export default Main;
