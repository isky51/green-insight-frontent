import axios from 'axios';
const CryptoJS = require("crypto-js");

/**
 * Define interceptor to handle api resoponse and set header value
 */
const Interceptor = (store: any) => {
    axios.interceptors.request.use(function (config) {        

        return config;
    }, (error) => {
        return Promise.reject(error);
    })
    axios.interceptors.response.use(response => {
        if (response?.data) {
            let bytes = CryptoJS.AES.decrypt(response?.data, process.env.REACT_APP_EN_KEY);
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return { ...response, data:decryptedData };
        } else {
            return response

        }
    }, (error) => {
        return Promise.reject(error);
    })
}
export default Interceptor

