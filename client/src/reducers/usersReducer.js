import { USERS_FETCHING, USERS_SUCCESS, USERS_FAILURE } from "../actions";

const initialState = {
  fetchingUsers: false,
  error: "",
  users: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCHING:
      return {
        ...state,
        error: "",
        fetchingUsers: true
      };
    case USERS_SUCCESS:
      return {
        ...state,
        error: "",
        fetchingUsers: false,
        users: action.payload
      };
    case USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        fetchingUsers: false
      };
    default:
      return state;
  }
};
