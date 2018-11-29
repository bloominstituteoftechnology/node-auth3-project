import React from 'react';

const Unauthorized = props => {
  setTimeout(() => {
    props.history.push('/');
  }, 15000);
  return (
    <div>
      <p>Sorry, you shouldn't be here... :( but you can be! Here's how!</p>
      <p>...redirecting back to main screen in 15 seconds</p>
    </div>
  );
};

export default Unauthorized;
