import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('user-token');

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
}

export default axiosWithAuth;