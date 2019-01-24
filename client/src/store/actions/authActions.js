import axios from 'axios';

export const LOADING = 'LOADING';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const FETCH_USERS = 'FETCH_USERS';
export const ERROR = 'ERROR';

const endpoint = process.env.REACT_APP_API_URL;

export const login = userInfo => dispatch => {
   dispatch({ type: LOADING, message: 'Logging in.' });

   axios
      .post(`http://localhost:5000/api/login`, userInfo)
      .then(res => {
         localStorage.setItem('jwt', res.data.token);

         dispatch({ type: LOGIN, payload: res.data });

         // get users
         getUsers(dispatch);
      })
      .catch(err => {
         dispatch({ type: ERROR, error: err });
      });
};

export const register = userInfo => dispatch => {
   dispatch({ type: LOADING, message: 'New user is registering.' });

   axios
      .post(`${endpoint}/api/register`, userInfo)
      .then(res => {
         localStorage.setItem('jwt', res.data.token);
         dispatch({ type: REGISTER, payload: res.data });
      })
      .catch(err => {
         dispatch({ type: ERROR, error: err });
      });
};

export const logout = () => {
   localStorage.removeItem('jwt');
   return { type: LOGOUT };
};

// dispatch is passed in as a parameter here
// this is in order to invoke the action in the login action
export const getUsers = dispatch => {
   const token = localStorage.getItem('jwt');
   const options = {
      headers: {
         authorization: token,
      },
   };

   dispatch({ type: LOADING, message: 'Fetching users.' });

   axios
      .get(`${endpoint}/api/users`, options)
      .then(res => {
         dispatch({ type: FETCH_USERS, payload: res.data.users });
      })
      .catch(err => {
         dispatch({ type: ERROR, error: err });
      });
};
