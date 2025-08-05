import axios from 'axios';

const axiosHttp = axios.create({
    baseURL: 'http://localhost:4001/api/',
    withCredentials:true,
})

axiosHttp.interceptors.response.use(
    (reponse)=>{
        return reponse;
    }, 
    (error)=>{
        return new Promise.reject(error);
    });

export default axiosHttp;