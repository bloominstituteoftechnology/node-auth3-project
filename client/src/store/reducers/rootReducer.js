import {
   LOADING,
   LOGIN,
   REGISTER,
   LOGOUT,
   FETCH_USERS,
   ERROR,
} from '../actions/authActions';

const initialState = {
   users: [],
   isLoggedIn: false,
   message: null,
   error: null,
   loading: false,
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOADING:
         return {
            ...state,
            message: action.message,
            loading: true,
            error: false,
         };

      case LOGIN:
         return {
            ...state,
            isLoggedIn: true,
            loading: false,
            error: false,
            message: null,
         };

      case REGISTER:
         return {
            ...state,
            isLoggedIn: true,
            loading: false,
            error: false,
            message: null,
         };

      case LOGOUT:
         return {
            ...state,
            users: [],
            isLoggedIn: false,
            message: null,
         };

      case FETCH_USERS:
         return {
            ...state,
            users: action.payload,
            loading: false,
            error: false,
         };

      case ERROR:
         return {
            ...state,
            error: action.err,
            loading: false,
         };

      default:
         return state;
   }
};

export default rootReducer;
