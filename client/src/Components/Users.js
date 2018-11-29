import React from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 50%;
  margin: 0 auto;
  align-items: center;
  height: auto;
  justify-content: center;
  font-size: 30px;
  font-family: Helvetica;
  border-radius: 15px;
  background: lightgray;

    button {
    border: 2px solid black;
    width: 100px;
    height: 25px;
    border-radius: 15px;
  }
`;

export default class Users extends React.Component {
  state = {
    users : [],
  };

  componentDidMount() {
    if (window.localStorage.getItem('token')) {
      const tok = JSON.parse(window.localStorage.getItem('token'));
      axios
        .get('http://localhost:3300/api/users', { headers: { Authorization: tok } })
        .then(res => {
          console.log(res);
          this.setState({ users: res.data });
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      this.props.history.push('/unauthorized');
    }
  }

  render() {
    return (
      <Container>
        {this.state.users.map(user => {
          return (
            <div>
              <p>Faculty Member: {user.username}</p>
              <p>Department: {user.department}</p>
            </div>
          );
        })}

        <button
          onClick={() => {
            window.localStorage.removeItem('token');
            this.props.history.push('/');
          }}>
          Logout
        </button>
      </Container>
    );
  }
}
