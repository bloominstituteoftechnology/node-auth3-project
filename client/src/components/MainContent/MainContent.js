import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import axios from 'axios';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    !jwt && this.props.history.push('/register');
    console.log(jwt);

    axios
      .get('http://localhost:5500/api/users', { headers: { authorization: jwt } })
      .then(response => {
        console.log('response.data', response.data);
        this.setState({ items: response.data.users });
      })
      .catch(e => {
        console.log('error', e);
      });
  }

  render() {
    const race = this.state.items.length > 0 && this.state.items[0].race;
    return (
      <React.Fragment>
        <h1>Race: {race}</h1>
        <ul>{this.state.items.map(item => <li id={Date.now}>Name: {item.username}</li>)}</ul>
      </React.Fragment>
    );
  }
}

export default MainContent;
