import React from 'react';
import { Link } from 'react-router-dom';

const User = props => {
  return (
    props.users.map(user => {
      return (
        <Link to={ `users/${ user._id }` } key={ user._id }>
          <ul>
            <li>{ user.username }</li>
            <li>{ user.race }</li>
          </ul>
        </Link>
      );
    })
  );
};
 
export default User;