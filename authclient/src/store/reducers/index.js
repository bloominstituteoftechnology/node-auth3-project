import {
  USERS_FETCH_START,
  USERS_FETCH_COMPLETE,
  USERS_FETCH_ERROR
} from "../actions";

const initialState = {
  users: [],

  fetchingUsers: false,

  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_START:
      return { ...state, fetchingUsers: true };
    case USERS_FETCH_COMPLETE:
      return { ...state, fetchingUsers: false, notes: action.payload };
    case USERS_FETCH_ERROR:
      return { ...state, fetchingUsers: false, error: action.payload };
    default:
      return state;
  }
};
