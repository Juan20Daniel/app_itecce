import { useCallback, useContext, useEffect, useState } from "react";
import IdTamplatesContext from "./IdTamplatesContext";
import axiosInstance from "../../data/remote/axios.instance";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
const IdTamplatesProvider = ({children}) => {
    const [ loadingTemplates, setLoadingTemplates ] = useState(true);
    const [ errorLoadingTamplates, setErrorLoadingTamplates ] = useState(false);
    const [ studentTemplates, setStudentTemplates ] = useState(null);
    const [ teacherTemplates, setSTeacherTemplates ] = useState(null);
    const [ collaboratorTemplates, setCollaboratorTemplates ] = useState(null);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const getTemplates = useCallback( async () => {
        try {
            const response = await axiosInstance.get('/templates');
            const { tamplatesBase64 } = response;
            setStudentTemplates(tamplatesBase64[0]);
            setSTeacherTemplates(tamplatesBase64[1]);
            setCollaboratorTemplates(tamplatesBase64[2]);
            // setImg(`data:image/jpeg;base64,${response.base64}`);
        } catch (error) {
            console.log(error);
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
        <IdTamplatesContext.Provider value={{
            studentTemplates,
            teacherTemplates,
            collaboratorTemplates,
            loadingTemplates,
            errorLoadingTamplates,
            setStudentTemplates,
            setSTeacherTemplates,
            setCollaboratorTemplates
        }}>
            {children}
        </IdTamplatesContext.Provider>
    );
}

export default IdTamplatesProvider;