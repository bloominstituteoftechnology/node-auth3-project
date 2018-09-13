import axios from 'axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
export const SIGN_UP_USER_FAILURE = 'SIGN_UP_USER_FAILURE';
export const LOG_IN_USER = 'LOG_IN_USER';
export const LOG_IN_USER_SUCCESS = 'LOG_IN_USER_SUCCESS';
export const LOG_IN_USER_FAILURE = 'LOG_IN_USER_FAILURE';

const URL = 'http://localhost:8000/api';

export const signUp = user => dispatch => {
  dispatch({ type: SIGN_UP_USER });
  axios
    .post(`${URL}/register`, user)
    .then(response => {
      dispatch({ type: SIGN_UP_USER_SUCCESS });
      console.log(response);
    })
    .catch(err => {
      dispatch({ type: SIGN_UP_USER_FAILURE });
      console.log(err);
    });
};

export const logIn = user => dispatch => {
  dispatch({ type: LOG_IN_USER });
  axios
    .post(`${URL}/login`, user)
    .then(response => {
      dispatch({ type: LOG_IN_USER_SUCCESS });
      console.log(response);
    })
    .catch(err => {
      dispatch({ type: LOG_IN_USER_FAILURE });
      console.log(err);
    });
};
