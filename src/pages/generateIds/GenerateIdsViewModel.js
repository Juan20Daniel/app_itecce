import { useState, useEffect, useRef } from "react";
import { useGetPersonsDB } from "../../hooks/useGetPersonsDB";
import { useSearchPersons } from "../../hooks/useSearchPersons";

export const GenerateIdsViewModel = () => {
    const [ selectSection, setSelectSection ] = useState('students');
    const [ idToSearch, setIdToSearch ] = useState('');
    const [ nameToSearch, setNameToSearch ] = useState('');
    const [ firstnameToSearch, setFirstnameToSearch ] = useState('');
    const [ lastnameToSearch, setLastnameToSearch ] = useState('');
    const [ searchBy, setSearchBy ] = useState('search-by-id');
    const [ showPerson, setShowPerson ] = useState(false);
    const [ personInfo, setPersonInfo ] = useState(null); 
    const [ isSearching, setIsSearching ] = useState(false);
    const [ notData, setNotData ] = useState(true);
    const notDataRef = useRef(null);
    const {renderPersons,data,hasMorePersons,isLoadingPersons} = useGetPersonsDB(selectSection);
    const {searchResult,isLoadingResults,interseptorSearch,showMoreResults} = useSearchPersons(selectSection,searchBy,idToSearch,nameToSearch,firstnameToSearch,lastnameToSearch);
    useEffect(() => {
        if(idToSearch !== '' || nameToSearch !== '' || firstnameToSearch !== '' || lastnameToSearch !== '') {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    },[idToSearch,nameToSearch,firstnameToSearch,lastnameToSearch]);
    useEffect(() => {
        if(notDataRef.current) setNotData(notDataRef.current.children.length > 0);
    },[isLoadingPersons]);
    //En caso de que cambiemos de sección podamos pintar los datos
    useEffect(() => {
        setNotData(true);
    },[selectSection]);
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
        renderPersons,
        data, 
        isLoadingPersons,
        hasMorePersons,
        isSearching,
        notDataRef,
        notData,
        searchResult, 
        isLoadingResults, 
        interseptorSearch, 
        showMoreResults,
        showPerson,
        personInfo,
        setPersonInfo,
        setShowPerson,
        setSearchBy,
        setIdToSearch,
        setNameToSearch,
        setFirstnameToSearch,
        setLastnameToSearch,
        setSelectSection,
        clearSearchInputs
    }
}