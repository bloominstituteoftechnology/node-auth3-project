import axios from 'axios';

export const FETCH_USERS = "FETCH_USERS";
export const FETCHING_USERS = "FETCHING_USERS";
export const ERROR = "ERROR";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: FETCHING_USERS });

    axios
      .get('http://localhost:8000/api/users')
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch({
          type: ERROR,
          payload: "Unable to fetch list of users (client side)."
        });
      });
  }
}

// export const addSmurf = (smurf) => {
//   const newSmurf = axios.post('http://localhost:3333/smurfs', smurf);

//   return dispatch => {
//     dispatch({ type: ADDING_SMURF });

//     newSmurf
//       .then(({data}) => {
//         dispatch({
//           type: ADD_SMURF,
//           payload: data
//         });
//       })
//       .catch(error => {
//         dispatch({
//           type: ERROR,
//           payload: error //type a string here instead
//         });
//       })
//   }
// }

// export const deleteSmurf = (id) => dispatch => {
//   dispatch({type: DELETING_SMURF});

//   axios
//     .delete(`http://localhost:3333/smurfs/${id}`)
//     .then(() => {
//       dispatch({type: DELETE_SMURF, id})
//     })
//     .catch(error => {
//       dispatch({
//         type: ERROR,
//         payload: error //type a string here instead
//       });
//     })
// }