import axios from 'axios';

const URL = "http://localhost:8000/api";

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const ERROR = 'ERROR';

export const login = (user, cb) => {
  return function(dispatch) {
    dispatch({ type: LOGGING_IN });
    console.log(user);

    axios.post(URL + `/login`, user)
          .then(res => {
                  dispatch({ type: LOGGED_IN, payload: res.data});
                  cb();
                }
          )
          .catch(err => dispatch({ type: ERROR, payload: err }));
  }
};

export const register = (user, cb) => {
  return function(dispatch){
    dispatch({ type: LOGGING_IN });

    axios.post(URL + `/register`, user)
          .then(res => {
            dispatch({ type: LOGGED_IN, payload: res.data });
            cb();
          }
        )
        .catch(err => dispatch({ type: ERROR, payload: err }));
  }
}

export const logout = () => {
  return {
    type: LOGGED_OUT
  }
};
