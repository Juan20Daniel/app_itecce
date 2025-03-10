import { useRef } from "react";
import PrintContext from "./PrintContext";

const PrintProvider = ({children}) => {
    const componentRef = useRef();
    const promiseResolveRef = useRef(null);
    const hideStyles = useRef(false);
    return (
        <PrintContext.Provider value={{
            componentRef, 
            promiseResolveRef, 
            hideStyles
        }}>
            {children}
        </PrintContext.Provider>
    );
}

export default PrintProvider;