import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        accessToken: localStorage.getItem('accessToken'),
    },
});

export default API;
