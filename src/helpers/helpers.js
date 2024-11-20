import { getTokenLocalStorage } from "../data/local/localStorage";
import { animateScroll as scroll } from "react-scroll";
import { jwtDecode } from "jwt-decode";
const expretions = {
    user:/^[a-zA-Z0-9ñÑóÓáÁéÉíÍúÚ ]{6,20}$/,
    password:/^.{8,20}$/,
    imgName:/^[0-9]{7}.(jpg|JPG)$/
}
export const check = (camp, value) => {
    if(expretions[camp].test(value)) return true;
    return false;
}
export const getUser = () => {
    const token = getTokenLocalStorage();
    if(!token) return false;
    const tokenDecoded = jwtDecode(token);
    return tokenDecoded.data;
}
export const validateImg = (e, result) => {
    const name = e.target.files[0].name;
    if(!expretions.imgName.test(name)) return result(true, null);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        result(false, reader.result);
    }
}
const addZero = (num) => {
    return num <= 9 ? `0${num}` : `${num}`;
}
export const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return {year, month:addZero(month), day:addZero(day)}
}
export const reverseText = (text) => {
    const result = text.split('-').reverse().join();
    return result;
}
export const getLastItems = (array_items, offset, range=11) => {
    let result = array_items.slice(offset, offset+range);
    return result;
}
export const scrollToTop = (idElement) => {
    scroll.scrollToTop({
        containerId:idElement,
        duration:0
    });
}
export const getGeneralExpireDate = () => {
    const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const date = new Date();
    const year = date.getFullYear().toString().replace(/^[0-9]{2}/,'');
    return months[date.getMonth()]+'/'+year;
}