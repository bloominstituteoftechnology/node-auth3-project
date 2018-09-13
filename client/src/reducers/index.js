import {
  LOGGING_IN,
  LOGGED_IN,
  LOGGED_OUT
 } from '../actions';

const startState = {
  isLoggingIn: false,
  isLoggedIn: false,
  username: null,
  id: null,
  department: null,
  token: null,
  error: null
};

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : startState;

export default (userInfo = initialState, action) => {
  switch(action.type) {
    case LOGGING_IN:
      return {
        ...userInfo,
        isLoggingIn: true,
      }
    case LOGGED_IN:
      return {
        ...userInfo,
        isLoggedIn: true,
        isLoggingIn: false,
        ...action.payload
      }
    case LOGGED_OUT:
      return {
        ...userInfo,
        isLoggedIn: false,
        username: null,
        id: null,
        department: null,
        token: null,
      }
    default:
      return userInfo;
  }
}
