import { useEffect, useState, useRef } from "react";
import axiosInstance from "../data/remote/axios.instance";
import { useDispatch } from "react-redux";
import { setCentralAlert } from "../redux/dataSlice";

export const useGetPersonsDB = (section) => {
    const [ data, setData ] = useState([]);
    const [ isLoadingPersons, setIsLoadingPersons ] = useState(true);
    const renderPersons = useRef(null);
    const offset = useRef(0);
    const hasMorePersons = useRef(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setData([]);
        hasMorePersons.current = true;
        offset.current = 0;
    },[section]);
    useEffect(() => {
        const getPersonsDB = async (section) => {
            try {
                setIsLoadingPersons(true);
                const result = await axiosInstance.get(section+'/?offset='+offset.current);
                hasMorePersons.current = result.nextPage;
                offset.current = result.nextPage;
                setData((data) => [...data, ...result.data]);
            } catch (error) {
                hasMorePersons.current = false;
                offset.current = 0;
                dispatch(setCentralAlert({
                    visible:true,
                    title:'Error al consultar los datos.', 
                    message:error.message,
                    type:'error'
                }));
            }finally {
                if(!hasMorePersons.current) setIsLoadingPersons(false);
            }
        }
        const OnIntersection = async (entries) => {
            const firstEntry = entries[0];
            if((firstEntry.isIntersecting || !data.length ) && hasMorePersons.current) {
                await getPersonsDB(section);
            }
        }
        const observer = new IntersectionObserver(OnIntersection);
        if(observer && renderPersons.current) observer.observe(renderPersons.current);
        return () => {
            if(observer) observer.disconnect();
        }
    },[renderPersons, section, data, dispatch]);
    
    return {renderPersons, data, hasMorePersons, isLoadingPersons}
}