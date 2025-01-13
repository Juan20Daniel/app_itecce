import { Outlet, Navigate } from "react-router-dom";
import { getTokenLocalStorage } from '../data/local/localStorage';
const Auth = () => {
    const token = getTokenLocalStorage();
    return (
        <>
            {token 
                ? <Outlet />
                : <Navigate to='/login' />
            }
        </>
    )
}

export default Auth;