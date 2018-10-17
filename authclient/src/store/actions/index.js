import axios from "axios";

export const USERS_FETCH_START = "USERS_FETCH_START";
export const USERS_FETCH_COMPLETE = "USERS_FETCH_COMPLETE";
export const USERS_FETCH_ERROR = "USERS_FETCH_ERROR";

export const getUsers = () => {
  return dispatch => {
    dispatch({ type: USERS_FETCH_START });
    axios
      .get("http://localhost:3000/api/users")
      .then(response => {
        console.log("RESPONSE DATA", response);
        dispatch({ type: USERS_FETCH_COMPLETE, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: USERS_FETCH_ERROR, payload: err });
      });
  };
};
