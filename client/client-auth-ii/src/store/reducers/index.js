
import {
  REGISTER_FETCHING, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_FETCHING, LOGIN_SUCCESS, LOGIN_FAILURE,
  USERS_FETCHING, USERS_SUCCESS, USERS_FAILURE,
  ROLES_FETCHING, ROLES_SUCCESS, ROLES_FAILURE
} from '../actions/types';


const initialState = {
  users: [],
  roles: [],
  rolesFetching: false,
  rolesFailure: null,
  registerFetching: false,
  registerFailure: null,
  loginFetching: false,
  loginFailure: null,
  userFetching: false,
  userFailure: null,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLES_FETCHING:
      return Object.assign({}, state, {
        rolesFetching: true,
      });
    case ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.payload,
        rolesFetching: false,
      });
    case ROLES_FAILURE:
      return Object.assign({}, state, {
        rolesFailure: true,
      });


    case REGISTER_FETCHING:
      return Object.assign({}, state, {
        registerFetching: true,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        registerFetching: false,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        registerFailure: true,
      });


    case LOGIN_FETCHING:
      return Object.assign({}, state, {
        loginFetching: true,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        loginFetching: false,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loginFailure: true,
      });


    case USERS_FETCHING:
      return Object.assign({}, state, {
        userFetching: true,
      });
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        userFetching: false,
      });
    case USERS_FAILURE:
      return Object.assign({}, state, {
        userFailure: true,
      });
    default:
      return state;
  }
}

