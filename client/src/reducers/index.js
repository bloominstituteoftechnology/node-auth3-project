import {
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  LOG_IN_USER,
  LOG_IN_USER_SUCCESS,
  LOG_IN_USER_FAILURE,
  GET_DEPARTMENTS,
  GET_DEPARTMENTS_SUCCESS,
} from '../actions';

const initialState = {
  signingUp: false,
  signUpFailure: false,
  loggingIn: false,
  loggedIn: false,
  gettingDepartments: false,
  departments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        ...state,
        signingUp: true,
      };
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        signingUp: false,
      };
    case LOG_IN_USER:
      return {
        ...state,
        loggingIn: true,
      };
    case LOG_IN_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
      };
    case GET_DEPARTMENTS:
      return {
        ...state,
        gettingDepartments: true,
      };
    case GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        gettingDepartments: false,
        departments: action.payload,
      };
    default:
      return state;
  }
};
