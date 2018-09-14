import axios from 'axios';

import {
  REGISTER_FETCHING, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_FETCHING, LOGIN_SUCCESS, LOGIN_FAILURE,
  USERS_FETCHING, USERS_SUCCESS, USERS_FAILURE,
  ROLES_FETCHING, ROLES_SUCCESS, ROLES_FAILURE
} from './types';


export const rolesFetching = () => dispatch => {
  dispatch({ type: ROLES_FETCHING });
  axios.get('http://localhost:3300/api/roles')
    .then(response => {
      dispatch({type: ROLES_SUCCESS, payload: response.data});
    })
    .catch(err => {
      dispatch({type: ROLES_FAILURE, payload: err});
    });
}


export const registerFetching = (userCreds) => dispatch => {
  dispatch({ type: REGISTER_FETCHING });
  axios.post('http://localhost:3300/api/register', userCreds)
    .then(response => {
      console.log(response.data);
      dispatch({type: REGISTER_SUCCESS, payload: response.data});
    })
    .catch(err => {
      dispatch({type: REGISTER_FAILURE, payload: err});
    });
}


export const loginFetching = (userCreds) => dispatch => {
  dispatch({ type: LOGIN_FETCHING });
  axios.post('http://localhost:3300/api/login', userCreds)
    .then(response => {
      localStorage.setItem('jwt', response.data.token)
      dispatch({type: LOGIN_SUCCESS})
    })
    .catch(err => {
      dispatch({type: LOGIN_FAILURE, payload: err})
    });
}


export const usersFetching = (reqOptions) => dispatch => {
  dispatch({ type: USERS_FETCHING });
  axios.get('http://localhost:3300/api/protected/users', reqOptions)
    .then(response => {
      console.log(response);
      dispatch({type: USERS_SUCCESS, payload: response.data})
    })
    .catch(err => {
      dispatch({type: USERS_FAILURE, payload: err})
    });
}
