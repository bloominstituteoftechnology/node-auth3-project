import React from 'react';
import axios from 'axios';

class UsersList extends React.Component {
  state = {
    users: [],
    username: ''
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(`http://localhost:4000/api/users`, options)
      .then(response => {
        console.log(response.data);
        this.setState({ users: response.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return(
    <div>
      <h1>Employees:</h1>
      {this.state.users.map(user => <div className={"user"} key={user.id} user={user} >
        <p>{user.username}</p>
    </div>)}
    </div>
    );
  }
}

export default UsersList;