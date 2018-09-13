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

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

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

export const logout = () => {
	console.log("HEYOOOO");
	localStorage.removeItem("token");
	return { type: LOGOUT_SUCCESS };
};

export const fetchUsers = () => dispatch => {
	dispatch({ type: LOGIN });
	axios({
		// method: "GET",
		// url: `${URL}/restricted/users`,
		headers: {
			authorization: localStorage.getItem("token"),
		},
	}).then(response => {
		dispatch({
			type: FETCH_USERS_SUCCESS,
			payload: response.data,
		});
		console.log(response);
	});
};
