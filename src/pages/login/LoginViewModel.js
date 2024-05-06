import { getUser } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
export const LoginViewModel = () => {
    const navigate = useNavigate();
    const verifyUser = () => {
        const user = getUser();
        if(user) navigate('/', {replace:true});
    }
   
    return { verifyUser }
}