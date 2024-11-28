import { useState, useEffect, useContext, useCallback } from "react";
import ValidityPeriodsContext from "./ValidityPeriodsContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
import axiosInstance from "../../data/remote/axios.instance";
const ValidityPeriodsProvider = ({children}) => {
    const [ students, setStudents ] = useState('');
    const [ teachers, setTeachers ] = useState('');
    const [ collaborators, setCollaborators ] = useState('');
    const { openCentralAlert } = useContext(CentralAlertContext);
    const [ error, setError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const validityPeriods = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(false);
            const { data } = await axiosInstance.get('/validityPeriods');
            setStudents(data[0].period);
            setTeachers(data[1].period);
            setCollaborators(data[2].period);
        } catch (error) {
            setError(true);
            setStudents('N/P');
            setTeachers('N/P');
            setCollaborators('N/P');
            openCentralAlert('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    },[openCentralAlert]);
    useEffect(() => {
        validityPeriods();
    },[validityPeriods]);
    return (
        <ValidityPeriodsContext.Provider value={{
            students,
            teachers,
            collaborators,
            error,
            isLoading,
            setStudents,
            setTeachers,
            setCollaborators,
            validityPeriods
        }}>
            {children}
        </ValidityPeriodsContext.Provider>
    );
}

export default ValidityPeriodsProvider;