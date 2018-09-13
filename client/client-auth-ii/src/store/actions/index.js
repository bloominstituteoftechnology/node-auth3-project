import axios from 'axios';

import {
  REGISTER_FETCHING, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_FETCHING, LOGIN_SUCCESS, LOGIN_FAILURE,
  USERS_FETCHING, USERS_SUCCESS, USERS_FAILURE,
  ROLES_FETCHING, ROLES_SUCCESS, ROLES_FAILURE
} from './types';


export const rolesFetching = () => dispatch => {
  dispatch({ type: ROLES_FETCHING });
  axios.get('/api/roles')
    .then(roles => {
      console.log(roles);
      dispatch({type: ROLES_SUCCESS, payload: roles});
    })
    .catch(err => {
      dispatch({type: ROLES_FAILURE, payload: err});
    });
}


export const registerFetching = (userCreds) => dispatch => {
  dispatch({ type: REGISTER_FETCHING });
  axios.post('/api/register', userCreds)
    .then(userInfo => {
      console.log(userInfo);
      dispatch({type: REGISTER_SUCCESS, payload: userInfo});
    })
    .catch(err => {
      dispatch({type: REGISTER_FAILURE, payload: err});
    });
}


export const loginFetching = (userCreds) => dispatch => {
  dispatch({ type: LOGIN_FETCHING });
  axios.post('/api/login', userCreds)
    .then(token => {
      console.log(token);
      dispatch({type: LOGIN_SUCCESS, payload: token})
    })
    .catch(err => {
      dispatch({type: LOGIN_FAILURE, payload: err})
    });
}


export const usersFetching = () => dispatch => {
  dispatch({ type: USERS_FETCHING });
  axios.get('/api/protected/users')
    .then(users => {
      console.log(users);
      dispatch({type: USERS_SUCCESS, payload: users})
    })
    .catch(err => {
      dispatch({type: USERS_FAILURE, payload: err})
    });
}
