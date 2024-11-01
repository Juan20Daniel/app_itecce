import { useEffect, useState, useRef, useContext } from "react";
import axiosInstance from "../data/remote/axios.instance";
import CentralAlertContext from "../context/centralAlert/CentralAlertContext";
import HomeContext from "../context/home/HomeContext";
const sections = {
    Alumnos:'students',
    Profesores:'teachers',
    Colaboradores:'collaborators'
}
export const usePersonsDB = () => {
    const [ data, setData ] = useState([]);
    const [ isLoadingPersons, setIsLoadingPersons ] = useState(true);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { addRemovePerson, homeState } = useContext(HomeContext);
    const { sectionSelected } = homeState;
    const renderPersons = useRef(null);
    const offset = useRef(0);
    const hasMorePersons = useRef(true);
    useEffect(() => {
        setData([]);
        hasMorePersons.current = true;
        offset.current = 0;
    },[sectionSelected]);
    useEffect(() => {
        const getPersonsDB = async (section) => {
            try {
                setIsLoadingPersons(true);
                const result = await axiosInstance.get(sections[section]+'/?offset='+offset.current);
                hasMorePersons.current = result.nextPage;
                offset.current = result.nextPage;
                setData((data) => [...data, ...result.data]);
            } catch (error) {
                hasMorePersons.current = false;
                offset.current = 0;
                openCentralAlert('Error al consultar los datos.', error.message, 'error');
            }finally {
                if(!hasMorePersons.current) setIsLoadingPersons(false);
            }
        }
        const OnIntersection = async (entries) => {
            const firstEntry = entries[0];
            if((firstEntry.isIntersecting || !data.length ) && hasMorePersons.current) {
                await getPersonsDB(sectionSelected);
            }
        }
        const observer = new IntersectionObserver(OnIntersection);
        if(observer && renderPersons.current) observer.observe(renderPersons.current);
        return () => {
            if(observer) observer.disconnect();
        }
    },[renderPersons, sectionSelected, data, openCentralAlert]);
    useEffect(() => {
        const remove = () => {
            const result = data.filter(item => item.idPerson !== homeState.removed);
            setData(result);
            addRemovePerson(null);
        }
        if(homeState.removed) remove();
    },[homeState.removed, data, addRemovePerson]);

    const remove = async (idPerson) => {
        try {
            const response = await axiosInstance.delete(`/${sections[sectionSelected.value]}/${idPerson}`);
            addRemovePerson(idPerson);
            openCentralAlert('Eliminación',response.message, 'success');
        } catch (error) {
            openCentralAlert('Eliminación',error.message,'error');
        }
    }
    return {renderPersons, data, hasMorePersons, isLoadingPersons, remove}
}