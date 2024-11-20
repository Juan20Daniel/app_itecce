import { useRef, useState, useCallback, useContext } from "react";
import axiosInstance from "../data/remote/axios.instance";
import CentralAlertContext from "../context/centralAlert/CentralAlertContext";

export const useFetch = () => {
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ thereAreMore, setThereAreMore ] = useState(true);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const nextItems = useRef(0);
    const requestHTTP = useCallback(async (url, replace) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(url);
            console.log(response);
            nextItems.current = response.next;
            setThereAreMore(response.thereAreMore??null);
            setError(null);
            if(!replace) setData(preState => ([...preState, ...response.data]));
            else setData(response.data);
        } catch (error) {
            console.log(error);
            setError(true);
            setIsLoading(false);
            openCentralAlert('Error al consultar los datos.', error.message, 'error');
        }
    },[openCentralAlert]);
    return {
        data,
        error,
        isLoading,
        nextItems,
        thereAreMore,
        setIsLoading,
        requestHTTP
    }
}



