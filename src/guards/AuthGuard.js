import { Outlet, Navigate } from "react-router-dom";
import { getTokenLocalStorage } from '../data/local/localStorage';
const AuthGuard = () => {
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

export default AuthGuard;