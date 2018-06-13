import React, { Component } from 'react';
import axios from 'axios';


export default class LoggedIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    const token = sessionStorage.getItem('token')
    const header = `${token}`;
    console.log(header)
    axios
      .get('http://localhost:5500/api/users')
        .then(response => {
          console.log(response)
        })
    // console.log(axios.get('http://localhost:5500/api/users', { headers: { header } }))
  }

  render() {
    return (
      <div>
        <h1>  LOGGED IN </h1>
      </div>
    )
  }
};

