import { useEffect, useState, useRef } from "react";
import axiosInstance from "../data/remote/axios.instance";
import { useDispatch } from "react-redux";
import { setCentralAlert } from "../redux/dataSlice";

export const useGetPersonsDB = (section) => {
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const elementRef = useRef(null);
    const offset = useRef(0);
    const hasMore = useRef(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setData([]);
        hasMore.current = true;
        offset.current = 0;
    },[section]);
    useEffect(() => {
        const getPersonsDB = async (section) => {
            try {
                setIsLoading(true);
                const result = await axiosInstance.get(section+'/?offset='+offset.current);
                hasMore.current = result.nextPage;
                offset.current = result.nextPage;
                setData((data) => [...data, ...result.data]);
            } catch (error) {
                hasMore.current = false;
                offset.current = 0;
                dispatch(setCentralAlert({
                    visible:true, 
                    title:'Error al consultar los datos.', 
                    message:error.message,
                    type:'error'
                }));
            }finally {
                if(!hasMore.current) setIsLoading(false);
            }
        }
        const OnIntersection = async (entries) => {
            const firstEntry = entries[0];
            if((firstEntry.isIntersecting || !data.length ) && hasMore.current) {
                await getPersonsDB(section);
            }
        }
        const observer = new IntersectionObserver(OnIntersection);
        if(observer && elementRef.current) observer.observe(elementRef.current);
        return () => {
            if(observer) observer.disconnect();
        }
    },[elementRef, section, data, dispatch]);
    
    return {elementRef, data, hasMore, isLoading}
}


//http://localhost:3000/api/v1/collaborators/?offset=0
//http://localhost:3000/api/v1/collaborators/search-by-id/2024023?offset=0
//http://localhost:3000/api/v1/collaborators/search-by-name/JUAN DA-M-?offset=0

// useEffect(() => {
//     offset.current = 0;
//     hasMore.current = true;
//     //metemos la validación de los campos de busqueda para que no se tenga que ejectar cuando la busqueda cuando no hay nada en los buscadores
//     if(isSearching && (idToSearch !== '' || nameToSearch !== '' || firstnameToSearch !== '' || lastnameToSearch !== '')) {
//         let valueToSearch = idToSearch; 
//         if(searchBy === 'byFullname') {
//             valueToSearch = nameToSearch+'-'+firstnameToSearch+'-'+lastnameToSearch;
//             valueToSearch = valueToSearch.replace(/^\s+|\s+$/g, '');
//         }
//         setLink('/'+section+fragmentLink[searchBy]+valueToSearch);
//     }else{
//         setLink('/'+section);
//     }
// },[isSearching, section, searchBy, idToSearch, nameToSearch, firstnameToSearch, lastnameToSearch]);