import {
	LOGIN_SUCCESS,
	FETCH_USERS_SUCCESS,
	LOGOUT_SUCCESS,
	SIGN_UP_USER_SUCCESS,
} from "../actions";

const initialState = { loggedIn: false, users: [] };

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				users: action.payload,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				loggedIn: false,
			};
		// case SIGN_UP_USER_SUCCESS:
		// 	return {
		// 		...state,
		// 		loggedIn: true,
		// };

		default:
			return state;
	}
};
