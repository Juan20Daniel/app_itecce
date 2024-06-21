import { useEffect, useState, useRef } from "react";
import axiosInstance from "../data/remote/axios.instance";
import { useDispatch } from "react-redux";
import { setCentralAlert } from "../redux/dataSlice";
export const useSearchPersons = (section, searchBy, idToSearch, nameToSearch, firstnameToSearch, lastnameToSearch) => {
    const [ searchResult, setSearchresult ] = useState([]);
    const [ fragmentUrl, setFragmentUrl ] = useState('');
    const [ isLoadingResults, setIsLoadingResults ] = useState(true);
    const interseptorSearch = useRef(null);
    const showMoreResults = useRef(false);
    const offset = useRef(0);
    const dispatch = useDispatch();
    useEffect(() => {
        if(fragmentUrl !== '') searchValue(fragmentUrl, 'replace', dispatch);
    },[fragmentUrl, dispatch]);
    useEffect(() => {
        //Lo reiniciamos a 0 para que nos regrese el scroll al inicio
        setSearchresult([]);
        setIsLoadingResults(true);
        showMoreResults.current = false;
        offset.current = 0
        let valueToSearch = idToSearch;
        if(searchBy === 'search-by-name') {
            valueToSearch = nameToSearch+
            '-'+firstnameToSearch+
            '-'+lastnameToSearch;
        }
        //Problema: Al colocar 1 funciona bien pero al quitarlo y ponerlo de nuevo, ya no porque la fragmentUrl no cambia de valor y por lo tanto no hace la peticion de datos
        setFragmentUrl('/'+section+'/'+searchBy+'/'+valueToSearch);
    },[section, searchBy, idToSearch, nameToSearch, firstnameToSearch, lastnameToSearch]);

    useEffect(() => {
        if(searchResult.length) {
            const OnIntersection = async (entries) => {
                const firstEntry = entries[0];
                if(firstEntry.isIntersecting && showMoreResults.current) {
                    searchValue(fragmentUrl, 'join', dispatch);
                }
            }
            const observer = new IntersectionObserver(OnIntersection);
            if(observer && interseptorSearch.current) observer.observe(interseptorSearch.current);
            return () => {
                if(observer) observer.disconnect();
            }
        }
    },[searchResult, fragmentUrl, dispatch]);

    const searchValue = async (fragmentUrl, action, dispatch) => {
        if(fragmentUrl.split('/')[3] === '' || fragmentUrl.split('/')[3] === '--') return;
        try {
            const result = await axiosInstance.get(fragmentUrl+'?offset='+offset.current);
            //Lo remplazamos en caso de que se este buscando, esto para que no junte los nuevos registros que ya tenia con los anteriores en caso de que sean los mismos
            setSearchresult(preState => action === 'replace' ? result.data : [ ...preState, ...result.data ]);
            showMoreResults.current = result.nextPage;
            offset.current = !result.nextPage ? 0 : result.nextPage;
            if(!showMoreResults.current) setIsLoadingResults(false);
        } catch (error) {
            showMoreResults.current = false;
            setIsLoadingResults(false);
            offset.current = 0;
            dispatch(setCentralAlert({
                visible:true,
                title:'Error al consultar los datos.', 
                message:error.message,
                type:'error'
            }));
        }
    }

    return {searchResult, isLoadingResults, interseptorSearch, showMoreResults}
}