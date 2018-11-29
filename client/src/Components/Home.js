import React from 'react';

const Home = props => {
  return (
    <div>
      <p>Welcome. Please click continue to proceed to the login screen.</p>
      <button
        onClick={() => {
          props.history.push('/signup');
        }}>
        Continue
      </button>
    </div>
  );
};

export default Home;
