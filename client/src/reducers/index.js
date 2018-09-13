import { LOGIN_SUCCESS } from "../actions";

const initialState = { loggedIn: false };

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
			};
		default:
			return state;
	}
};
