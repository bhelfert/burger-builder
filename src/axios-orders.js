import axios from 'axios';

const BURGER_HOST = 'Please_configure_Google_Firebase_Burger_Host_in_file_axios-orders.js'

const instance = axios.create({
    baseURL: `https://${BURGER_HOST}.firebaseio.com/`
});

export default instance;