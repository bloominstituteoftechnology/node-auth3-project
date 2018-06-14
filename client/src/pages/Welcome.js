import React from 'react';
import { Link } from 'react-router-dom';

const letsLogin = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <img className="ma3 mw8 dblock" src='https://i.redditmedia.com/2J8ilaevfLSFzJVBasBP-Wq9QC4T3Pw8CrxPxVgoUF4.jpg?s=33a9e741133b6db3bbf99ed220529eae' alt="Some image from Reddit" />
      <Link to='/login' className="mh2 f6 link dim br3 ph3 pv2 mb2 dib white bg-black" href="#0">Login here</Link>
      <Link to='/register' className="mh2 f6 link dim br3 ph3 pv2 mb2 dib white bg-black" href="#0">Register Here</Link>
    </div>
  );
}

const letsGetOuttaHere = (props) => {
  setTimeout(() => {
    props.history.push('/users');
  }, 2000);
  return (
    <div>
      <h1>Welcome!</h1>
      <img className="ma3 mw8 dblock" src='https://i.redditmedia.com/2J8ilaevfLSFzJVBasBP-Wq9QC4T3Pw8CrxPxVgoUF4.jpg?s=33a9e741133b6db3bbf99ed220529eae' alt="Some image from Reddit" />
      <p>Looks like you're already logged in!</p>
      <p>Sit tight while we take you to Users</p>
    </div>
  );
}

const Welcome = (props) => {
  if (props.token) {
    return letsGetOuttaHere(props);
  } else {
    return letsLogin();
  }
}

export default Welcome;