import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4020/api',
  headers: {
    Authorization: localStorage.getItem('token')
    // ? localStorage.getItem('token')
    // : null
  }
});
