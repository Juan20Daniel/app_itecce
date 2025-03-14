import { useState } from "react";
import ChangeFormAuthContext from "./ChangeFormAuthContext";
const ChangeFormAuthProvider = ({children}) => {
   const [ showLogin, setShowLogin ] = useState(true);
    return (
        <ChangeFormAuthContext.Provider value={{
            showLogin, setShowLogin
        }}>
            {children}
        </ChangeFormAuthContext.Provider>
    )
}

export default ChangeFormAuthProvider;