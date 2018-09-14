
import {
  REGISTER_FETCHING, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_FETCHING, LOGIN_SUCCESS, LOGIN_FAILURE,
  USERS_FETCHING, USERS_SUCCESS, USERS_FAILURE,
  ROLES_FETCHING, ROLES_SUCCESS, ROLES_FAILURE
} from '../actions/types';


const initialState = {
  users: [],
  roles: [],
  isRolesFetching: false,
  isRolesFailure: null,
  isRegisterFetching: false,
  isRegisterFailure: null,
  isLoginFetching: false,
  isLoginFailure: null,
  isUserFetching: false,
  isUserFailure: null,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLES_FETCHING:
      return Object.assign({}, state, {
        isRolesFetching: true,
      });
    case ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.payload,
        isRolesFetching: false,
      });
    case ROLES_FAILURE:
      return Object.assign({}, state, {
        isRolesFailure: true,
      });


    case REGISTER_FETCHING:
      return Object.assign({}, state, {
        isRegisterFetching: true,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isRegisterFetching: false,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isRegisterFailure: true,
      });


    case LOGIN_FETCHING:
      return Object.assign({}, state, {
        isLoginFetching: true,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginFetching: false,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoginFailure: true,
      });


    case USERS_FETCHING:
      return Object.assign({}, state, {
        isUserFetching: true,
      });
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        isUserFetching: false,
      });
    case USERS_FAILURE:
      return Object.assign({}, state, {
        isUserFailure: true,
      });
    default:
      return state;
  }
}

