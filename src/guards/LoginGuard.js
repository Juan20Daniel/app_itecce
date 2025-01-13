import { Outlet, Navigate } from "react-router-dom";
import { getTokenLocalStorage } from '../data/local/localStorage';
const LoginGuard = () => {
    const token = getTokenLocalStorage();
    return (
        <>
            {!token 
                ? <Outlet />
                : <Navigate to='/' />
            }
        </>
    )
}

export default LoginGuard;