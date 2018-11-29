import React from 'react';

const Home = props => {
  return (
    <div>
      <p>Welcome. Please click continue to proceed to the login screen.</p>
      <button
        onClick={() => {
          props.history.push('/signin');
        }}>
        LOGIN
      </button>
      <p>Need an account? Click the button to sign up for one.</p>
      <button
        onClick={() => {
          props.history.push('/signup');
        }}>
        SIGN UP 
      </button>
    </div>
  );
};

export default Home;
