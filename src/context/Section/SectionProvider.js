import { useState } from "react";
import { getOptionsLocalStorage } from "../../data/local/localStorage";
import GenerateIdContext from "./SectionContext";

const initialValue = getOptionsLocalStorage()?.find(option => option.selected).value??'Alumno'
const SectionProvider = ({children}) => {
    const [ sectionSelected, setSectionSelected ] = useState(initialValue);
    return (
        <GenerateIdContext.Provider value={{
            sectionSelected,
            setSectionSelected
        }}>
            {children}
        </GenerateIdContext.Provider>
    );
}

export default SectionProvider;