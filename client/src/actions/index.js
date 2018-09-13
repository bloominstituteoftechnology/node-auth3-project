import axios from 'axios';

export const REGISTERING_USER = 'REGISTERING_USER';
export const REGISTERED_USER = 'REGISTERED_USER';
export const LOGGING_IN_USER = 'LOGGING_IN_USER';
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHED_USERS = 'FETCHED_USERS';
export const LOGGING_OUT_USER = 'LOGGING_OUT_USER';
export const LOGGED_OUT_USER = 'LOGGED_OUT_USER';
export const ERROR = 'ERROR';

const url = 'http://localhost:9000/api';

export const registerUser = (user, history) => {
  return dispatch => {
    dispatch({ type: REGISTERING_USER });

    axios.post(`${url}/register`, user)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        dispatch({ type: REGISTERED_USER });
      })
      .then(() => history.push('/users'))
      .catch(err => {
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
};

export const loginUser = (user, history) => {
  return dispatch => {
    dispatch({ type: LOGGING_IN_USER });

    axios.post(`${url}/login`, user)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        dispatch({ type: LOGGED_IN_USER });
      })
      .then(() => history.push('/users'))
      .catch(err => {
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
};

export const fetchUsers = (token) => {
  return dispatch => {
    dispatch({ type: FETCHING_USERS });
    axios.get(`${url}/users`, { headers: { Authorization: token } })
      .then(res => {
        dispatch({ type: FETCHED_USERS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
};

export const logoutUser = (history) => {
  return dispatch => {
    dispatch({ type: LOGGING_OUT_USER });
    localStorage.removeItem('token');
    dispatch({ type: LOGGED_OUT_USER, payload: [] });
    history.push('/login');
  };
};
