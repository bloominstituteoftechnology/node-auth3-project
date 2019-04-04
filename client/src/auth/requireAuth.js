import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/users';

axios.interceptors.request.use(
    function(options) {
        options.headers.authorization = localStorage.getItem('token');
        console.log(options)
        return options;
    },

    function(err) {
        return Promise.reject(err);
    }
);

export default (Component)  => {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('token');
            const fail = <h1>Please Login</h1>;
            console.log(token)
            return <>
                        { token ? <Component { ...this.props } /> 
                                : this.props.history.push('/login') }
                   </>
        }
    }
}