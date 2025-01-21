import { useState } from "react";
import SectionOptionsContext from "./SectionOptionsContext";

const SectionOptionsProvider = ({children}) => {
    const [ options, setOptions ] = useState([
        { id:1, active:true, value:"students", name:'Estudiantes'},
        { id:2, active:false, value:"teachers", name:"Profesores" },
        { id:3, active:false, value:"collaborators", name:"Colaboradores" }
    ]);
    return (
        <SectionOptionsContext.Provider value={{
            options,
            setOptions
        }}>
            {children}
        </SectionOptionsContext.Provider>
    );
}

export default SectionOptionsProvider;