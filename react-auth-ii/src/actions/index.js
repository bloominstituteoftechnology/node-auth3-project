import axios from 'axios';

// example action
export const EXAMPLE_ACTION = 'EXAMPLE_ACTION';
export const EXAMPLE_ACTION_SUCCESS = 'EXAMPLE_ACTION_SUCCESS';
export const EXAMPLE_ACTION_ERROR = 'EXAMPLE_ACTION_ERROR';

// Test loading messages
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getNotes = () => {
	return dispatch => {
		dispatch({ type: EXAMPLE_ACTION });

		axios
			.get('/api/exampleEndpoint')

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: EXAMPLE_ACTION_SUCCESS, payload: data });
			})

			.catch(error => dispatch({ type: EXAMPLE_ACTION_ERROR, payload: error }));
	};
};
