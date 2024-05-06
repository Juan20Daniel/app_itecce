import axiosInstance from "./axios.instance";
import { otherErrorsRequest } from './otherErrors.request';
import { getTokenLocalStorage } from "../local/localStorage";
axiosInstance.interceptors.request.use((request) => {
    const token = getTokenLocalStorage();
    request.headers.Authorization = `JWT ${token}`
    return request;
})

axiosInstance.interceptors.response.use((response) => {
    return response.data;    
},(error) => {
    const existsResponse = error.hasOwnProperty('response');
    return Promise.reject(existsResponse ? error.response.data : otherErrorsRequest(error.code));
});