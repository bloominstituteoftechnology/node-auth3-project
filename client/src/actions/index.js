import axios from "axios";
import axiosWithAuth from "../components/axiosWithAuth";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_FETCH = "LOGIN_FETCH";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginReq = values => dispatch => {
  axios
    .post("https://nodewithsession.herokuapp.com/api/login", values)
    .then(res => {
      console.log(res);
      //   sessionStorage.setItem("token", res.data.token)
      //   axios.get("https://nodewithsession.herokuapp.com/api/users").then(res => {
      //     console.log(res);
      //   });
    })
    .catch(error => {
      console.log(error);
    });
};

export const allUsers = () => dispatch => {
  axios
    .get("https://nodewithsession.herokuapp.com/api/users")
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
