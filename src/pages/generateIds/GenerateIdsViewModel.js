import { useState, useEffect, useRef } from "react";
import { useGetPersonsDB } from "../../hooks/useGetPersonsDB";
export const GenerateIdsViewModel = () => {
    const [ selectSection, setSelectSection ] = useState('students');
    const [ idToSearch, setIdToSearch ] = useState('');
    const [ nameToSearch, setNameToSearch ] = useState('');
    const [ firstnameToSearch, setFirstnameToSearch ] = useState('');
    const [ lastnameToSearch, setLastnameToSearch ] = useState('');
    const [ searchBy, setSearchBy ] = useState('byId');
    const [ isSearching, setIsSearching ] = useState(false);
    const {elementRef, data, hasMore, isLoading} = useGetPersonsDB(selectSection);
    const [ notData, setNotData ] = useState(false);
    const notdataRef = useRef(false);
    useEffect(() => {
        if(idToSearch !== '' || nameToSearch !== '' || firstnameToSearch !== '' || lastnameToSearch !== '') {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    },[idToSearch,nameToSearch,firstnameToSearch,lastnameToSearch]);
    useEffect(() => {
        setNotData(notdataRef.current.children.length === 0);
    },[isLoading]);
    const clearSearchInputs = () => {
        setIdToSearch('');
        setNameToSearch('');
        setFirstnameToSearch('');
        setLastnameToSearch('');
    }
    return {
        selectSection,
        idToSearch,
        nameToSearch,
        firstnameToSearch,
        lastnameToSearch,
        searchBy,
        elementRef,
        data, 
        isLoading,
        hasMore,
        isSearching,
        notdataRef,
        notData,
        setSearchBy,
        setIdToSearch,
        setNameToSearch,
        setFirstnameToSearch,
        setLastnameToSearch,
        setSelectSection,
        clearSearchInputs
    }
}