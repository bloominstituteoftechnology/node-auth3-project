import { LOGGING_IN, LOGGED_IN, LOGGING_OUT, LOGGED_OUT, FETCH_USERS, FETCHING_USERS, ERROR } from '../actions';

const initialState = {
    loggingIn: false,
    isLoggedIn: false,
    loggingOut: false,
    users: [],
    fetchingUsers: false,
    // addingUser: false,
    // updatingSmurf: false,
    // deletingSmurf: false,
    error: null
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGING_IN:
            return {
                ...state,
                loggingIn: true,
                isLoggedIn: false,
                loggingOut: false
            }
        case LOGGED_IN:
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: true,
                loggingOut: false
            }

        case LOGGING_OUT:
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: false,
                loggingOut: true
            }
        case LOGGED_OUT:
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: false,
                loggingOut: false
            }

        case FETCHING_USERS:
            return {
                ...state,
                fetchingUsers: true
            }
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
                fetchingUsers: false
            }

        // case ADD_SMURF:
        //   return {
        //     ...state,
        //     smurfs: action.payload,
        //     addingSmurf: false
        //   }
        // case ADDING_SMURF:
        //   return {
        //     ...state,
        //     addingSmurf: true
        //   }

        // case DELETE_SMURF:
        //   return {
        //     ...state,
        //     deletingSmurf: false,
        //     smurfs: state.smurfs.filter(smurf => smurf.id !== action.id)
        //   }
        // case DELETING_SMURF:
        //   return {
        //     ...state,
        //     deletingSmurf: true
        //   }

        case ERROR:
            return {
                ...state,
                fetchingUsers: false,
            }

        default:
            return state;
    }
}