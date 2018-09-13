import axios from "axios";

export const SIGN_UP_USER = "SIGN_UP_USER";
export const SIGN_UP_USER_SUCCESS = "SIGN_UP_USER_SUCCESS";
export const SIGN_UP_USER_FAILURE = "SIGN_UP_USER_FAILURE";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const URL = "http://localhost:8000/api";

export const signUp = user => dispatch => {
	dispatch({ type: SIGN_UP_USER });
	axios
		.post(`${URL}/register`, user)
		.then(response => {
			dispatch({ type: SIGN_UP_USER_SUCCESS });
			console.log(response);
			localStorage.setItem("token", response.data.token);
		})
		.catch(err => {
			dispatch({ type: SIGN_UP_USER_FAILURE });
			console.log(err);
		});
};

export const login = user => dispatch => {
	dispatch({ type: LOGIN });
	axios
		.post(`${URL}/login`, user)
		.then(response => {
			dispatch({ type: LOGIN_SUCCESS });
			console.log(response);
			localStorage.setItem("token", response.data.token);
		})
		.catch(err => {
			dispatch({ type: LOGIN_FAILURE });
		});
};
