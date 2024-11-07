import { useState } from "react";
import ShowPersonContext from "./ShowPersonContext";
const ShowPersonProvider = ({children}) => {
    const [ showPerson, setShowPerson ] = useState(false);
    const [ personInfo, setPersonInfo ] = useState(null); 
    const [ priningDate, setPriningDate ] = useState(null);
    return (
        <ShowPersonContext.Provider value={{
            showPerson,
            personInfo,
            priningDate,
            setShowPerson,
            setPersonInfo,
            setPriningDate
        }}>
            {children}
        </ShowPersonContext.Provider>
    );
}

export default ShowPersonProvider;