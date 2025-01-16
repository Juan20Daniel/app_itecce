import { jwtDecode } from "jwt-decode";
import { getTokenLocalStorage } from "../data/local/localStorage";
export const tokenDecoded = () => {
    const token = getTokenLocalStorage();
    if(!token) return null;
    const decode = jwtDecode(token);
    console.log(decode);
}