import React from 'react';
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:5000/api';
Axios.interceptors.request.use(options => {
    options.headers.authorization = localStorage.getItem('jwt');
    return options;
  },
  
  function(err) {
    return Promise.reject(err);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('jwt');
      const notLoggingIn = <div>Please Login to See Content</div>

      return <> { token ? <Component {...this.props} /> : notLoggingIn } </>
    }
  }
}