import { } from '../actions';

const startState = {
  isLoggingIn: false,
  isLoggedIn: false,
  username: null,
  id: null,
  department: null,
  token: null
};

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : startState;

export default (userInfo = initialState, action) => {
  switch(action.type) {
    case LOGGING_IN:
      return {
        ...userInfo,
        isLoggingIn: true,
      },
    case LOGGED_IN:
      return {
        isLoggedIn: true,
        isLoggingIn: false,
        username: action.username,
        id: action.id,
        department: action.department,
        token: action.token,
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
      return user;
  }
}
