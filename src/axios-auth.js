import axios from 'axios';

const FIREBASE_WEB_API_KEY = 'Please_configure_Google_Firebase_Web_API_Key_in_file_axios-auth.js';

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts'
});

// Workaround: setting 'params' with axios.create(..) is not possible due to https://github.com/axios/axios/issues/2190
instance.interceptors.request.use(config => {
    config.params = config.params || {};
    config.params.key = FIREBASE_WEB_API_KEY;
    return config;
});

export default instance;