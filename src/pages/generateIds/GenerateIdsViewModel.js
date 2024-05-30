import { useState, useEffect } from "react";
import { useGetPersonsDB } from "../../hooks/useGetPersonsDB";
export const GenerateIdsViewModel = () => {
    const [ selectSection, setSelectSection ] = useState('students');
    const [ idToSearch, setIdToSearch ] = useState('');
    const [ nameToSearch, setNameToSearch ] = useState('');
    const [ firstnameToSearch, setFirstnameToSearch ] = useState('');
    const [ lastnameToSearch, setLastnameToSearch ] = useState('');
    const [ searchBy, setSearchBy ] = useState('byId');
    const [ isSearching, setIsSearching ] = useState(false);
    const {elementRef, data, isLoading} = useGetPersonsDB(selectSection);
    useEffect(() => {
        if(idToSearch !== '' || nameToSearch !== '' || firstnameToSearch !== '' || lastnameToSearch !== '') {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    },[idToSearch,nameToSearch,firstnameToSearch,lastnameToSearch]);
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

        isSearching,
        

        setSearchBy,
        setIdToSearch,
        setNameToSearch,
        setFirstnameToSearch,
        setLastnameToSearch,
        setSelectSection,
        clearSearchInputs
    }
}