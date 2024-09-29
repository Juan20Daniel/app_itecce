import { useState } from "react";
import ModalShowPersonContext from "./ModalShowPersonContext";
const ModalShowPersonProvider = ({children}) => {
    const [ showPerson, setShowPerson ] = useState(false);
    const [ personInfo, setPersonInfo ] = useState(null); 
    const [ priningDate, setPriningDate ] = useState(null);
    const [ delivaryDate, setDelivaryDate ] = useState(null);
    return (
        <ModalShowPersonContext.Provider value={{
            showPerson,
            personInfo,
            priningDate,
            delivaryDate,
            setShowPerson,
            setPersonInfo,
            setDelivaryDate,
            setPriningDate
        }}>
            {children}
        </ModalShowPersonContext.Provider>
    );
}

export default ModalShowPersonProvider;