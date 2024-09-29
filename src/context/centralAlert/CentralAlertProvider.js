import { useState, useCallback } from "react";
import CentralAlertContext from "./CentralAlertContext";
const CentralAlertProvider = ({children}) => {
    const [centralAlert, setCentralAlert] = useState({
        visible:false, 
        title:'', 
        message:'', 
        type:'', 
        action:null
    });
    const openCentralAlert = useCallback((title, message, type, action=null) => {
        setCentralAlert({
            visible:true, 
            title, 
            message, 
            type, 
            action
        });
    },[]);
    const closeCentralAlert = () => {
        setCentralAlert({
            visible:false, 
            title:'', 
            message:'', 
            type:'', 
            action:null
        });
    }
    return (
        <CentralAlertContext.Provider value={{
            centralAlert,
            openCentralAlert,
            closeCentralAlert
        }}>
            {children}
        </CentralAlertContext.Provider>
    )
}

export default CentralAlertProvider;