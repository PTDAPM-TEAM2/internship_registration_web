import axios from "axios";
import qs from 'query-string';

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers:{
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
    //Handle token here
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, (error) => {
    //handle error
    throw error;
});

export default axiosClient;
