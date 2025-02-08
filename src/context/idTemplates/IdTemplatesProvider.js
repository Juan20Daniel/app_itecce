import { useCallback, useContext, useEffect, useState } from "react";
import IdTemplatesContext from "./IdTemplatesContext";
import axiosInstance from "../../data/remote/axios.instance";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
const IdTemplatesProvider = ({children}) => {
    const [ loadingTemplates, setLoadingTemplates ] = useState(true);
    const [ errorLoadingTamplates, setErrorLoadingTamplates ] = useState(false);
    const [ studentTemplates, setStudentTemplates ] = useState(null);
    const [ teacherTemplates, setTeacherTemplates ] = useState(null);
    const [ collaboratorTemplates, setCollaboratorTemplates ] = useState(null);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const getTemplates = useCallback( async () => {
        try {
            setLoadingTemplates(true);
            const response = await axiosInstance.get('/templates');
            const { tamplatesBase64 } = response;
            setStudentTemplates(tamplatesBase64[0]);
            setTeacherTemplates(tamplatesBase64[1]);
            setCollaboratorTemplates(tamplatesBase64[2]);
            setErrorLoadingTamplates(false);
        } catch (error) {
            setErrorLoadingTamplates(true);
            openCentralAlert('Plantillas de credenciales','Error al optener las plantillas de credenciales', 'error');
        } finally {
            setLoadingTemplates(false);
        }
    },[openCentralAlert]);
    useEffect(() => {
        getTemplates();
    },[getTemplates]);
    return (
        <IdTemplatesContext.Provider value={{
            studentTemplates,
            teacherTemplates,
            collaboratorTemplates,
            loadingTemplates,
            errorLoadingTamplates,
            setStudentTemplates,
            setTeacherTemplates,
            setCollaboratorTemplates,
            getTemplates
        }}>
            {children}
        </IdTemplatesContext.Provider>
    );
}

export default IdTemplatesProvider;