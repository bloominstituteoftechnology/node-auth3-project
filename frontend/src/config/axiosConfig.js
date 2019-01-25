import axios from 'axios';

export default (store) => {
    axios.interceptors.response.use((response) => {
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            store.clear();
            window.location.reload();
        } else {
            return Promise.reject(error);
        }
    });
};