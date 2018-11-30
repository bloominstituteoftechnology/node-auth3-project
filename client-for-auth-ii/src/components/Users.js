import React, { Component } from 'react';
import styled from 'styled-components';

const StyledUsers = styled.div`
  width: 70%;
  margin: 2rem auto 0;
  .User {
    padding: 2rem 1rem;
    &:nth-child(odd) {
      background: #d2d2d2;
      color: white;
    }
  }
`;

class Users extends Component {
  state = {};
  render() {
    const { users } = this.props;
    return (
      <StyledUsers>
        {!users ? (
          <div>Loading users...</div>
        ) : (
          users.map(user => (
            <div className="User" key={user.id}>
              {user.username}
            </div>
          ))
        )}
      </StyledUsers>
    );
  }
}

export default Users;
