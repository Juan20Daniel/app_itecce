import { getTokenLocalStorage } from "../data/local/localStorage";
import { jwtDecode } from "jwt-decode";
const expretions = {
    user:/^[a-zA-Z0-9ñÑóÓáÁéÉíÍúÚ ]{6,20}$/,
    password:/^.{8,20}$/
}

export const check = (camp, value) => {
    if(expretions[camp].test(value)) return true;
    return false;
}

export const getUser = () => {
    const token = getTokenLocalStorage();
    // console.log(token)
    if(!token) return false;
    const tokenDecoded = jwtDecode(token);
    return tokenDecoded.data;
}