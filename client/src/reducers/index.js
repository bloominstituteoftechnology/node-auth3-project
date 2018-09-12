import * as actionTypes from '../actions';

const initialState = {
  registeringUser: false,
  loggingInUser: false,
  fetchingUsers: false,
  error: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.REGISTERING_USER:
    return {
      ...state,
      registeringUser: true
    };
  case actionTypes.REGISTERED_USER:
    return {
      ...state,
      registeringUser: false
    };
  case actionTypes.LOGGING_IN_USER:
    return {
      ...state,
      loggingInUser: true
    };
  case actionTypes.LOGGED_IN_USER:
    return {
      ...state,
      loggingInUser: false
    };
  case actionTypes.FETCHING_USERS:
    return {
      ...state,
      fetchingUsers: true
    };
  case actionTypes.FETCHED_USERS:
    return {
      ...state,
      fetchingUsers: false
    };
  case actionTypes.ERROR:
    return {
      ...state,
      registeringUser: false,
      loggingInUser: false,
      fetchingUsers: false,
      error: action.payload
    };
  default:
    return state;
  }
};
