import { useState } from "react";
import ModalShowPersonContext from "./ModalShowPersonContext";
const ModalShowPersonProvider = ({children}) => {
    const [ showPerson, setShowPerson ] = useState(false);
    const [ personInfo, setPersonInfo ] = useState(null); 
    const [ priningDate, setPriningDate ] = useState(null);
    return (
        <ModalShowPersonContext.Provider value={{
            showPerson,
            personInfo,
            priningDate,
            setShowPerson,
            setPersonInfo,
            setPriningDate
        }}>
            {children}
        </ModalShowPersonContext.Provider>
    );
}

export default ModalShowPersonProvider;