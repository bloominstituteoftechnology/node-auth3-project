import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoggedIn: false,
      department: '',
    }
  }

  componentDidMount() {
    this.authenticate();
  }


  authenticate = () => {
    const token = localStorage.getItem('super_secret');
    if (token) {
      const options = {
        headers: {
          authorization: token,
        },
      }
      axios
        .get(`${url}/api/users`, options)
        .then(response => {
          console.log(response.data);
          this.setState({
            users: response.data.users,
            department: response.data.department,
            isLoggedIn: true,
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (<h3>It looks like you're not signed in. Please <Link to='/signin'>Login</Link> or <Link to='/signup'>Register</Link></h3>)
    }
    return (
    <div>
    {this.state.users.length > 0 ? <h3>Here is the list for the {this.state.department} department:</h3> : <h3>Loading...</h3>}

    {this.state.users.map(user => {
      return <p key={user.id}>{user.username}</p>
    })}
    </div>
    )
  }
}

export default UserList;
