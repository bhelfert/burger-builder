import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-delicious-burger.firebaseio.com/'
});

export default instance;