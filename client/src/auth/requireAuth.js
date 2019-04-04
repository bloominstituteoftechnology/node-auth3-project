import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/users';

axios.interceptors.request.use(
    function(options) {
        options.headers.authorization = localStorage.getItem('token');

        return options;
    },

    function(err) {
        return Promise.reject(err);
    }
);

export default function(Component) {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('token');
            const fail = <h1>Please Login</h1>;

            return <>
                        { token ? <Component { ...this.props } /> 
                                : fail }
                   </>
        }
    }
}