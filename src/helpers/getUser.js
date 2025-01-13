import { getTokenLocalStorage } from "../data/local/localStorage";
import { jwtDecode } from "jwt-decode";
export const getUser = () => {
    const token = getTokenLocalStorage();
    if(!token) return false;
    const tokenDecoded = jwtDecode(token);
    return tokenDecoded.data;
}