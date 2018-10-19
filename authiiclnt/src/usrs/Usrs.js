import React, { Component } from 'react';
import axios from 'axios';

class Usrs extends Component {
  state = {
    usrs: [],
  };

  componentDidMount() {
    const tkn = localStorage.getItem('jwt');

    axios
      .get('http://localhost:5000/api/usrs', 
      { headers: {
            Authorization: tkn,
        },
      })
      .then(res => {
        console.log(res.data);
        this.setState({ usrs: res.data.usrs });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.usrs.map(usridv => (
            <li key={usridv.id}>{usridv.usrs_nme}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Usrs;