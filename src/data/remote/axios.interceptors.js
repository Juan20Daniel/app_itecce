import axiosInstance from "./axios.instance";
import { handleErrors } from './errors.request';
import { getTokenLocalStorage } from "../local/localStorage";
axiosInstance.interceptors.request.use((request) => {
    const token = getTokenLocalStorage();
    request.headers.Authorization = `JWT ${token}`
    return request;
})

axiosInstance.interceptors.response.use((response) => {
    return response.data;    
},(error) => {
    return Promise.reject(handleErrors(error))
});