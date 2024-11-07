import { useState } from "react";
import { getOptionsLocalStorage } from "../../data/local/localStorage";
import GenerateIdContext from "./SectionContext";

const SectionProvider = ({children}) => {
    const [ sectionSelected, setSectionSelected ] = useState(getOptionsLocalStorage()?.find(option => option.selected).value??'Alumno');
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