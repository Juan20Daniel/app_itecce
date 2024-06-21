import { getTokenLocalStorage } from "../data/local/localStorage";
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