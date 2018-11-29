import React from 'react';

const Unauthorized = props => {
  return (
    <div>
      <p>Sorry, you shouldn't be here... :( but you can be! Here's how!</p>
      <p>...redirecting back to main screen in 15 seconds</p>
      {setTimeout(() => {
        props.history.push('/');
      }, 15000)}
    </div>
  );
};

export default Unauthorized;
