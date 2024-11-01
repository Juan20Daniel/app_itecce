import { useEffect, useReducer } from "react";
import { reducerIds } from "../../reducer/reducerIds";
import { types } from "../../types/types";
import GenerateIdContext from "./HomeContext";
import { getOptionsLocalStorage } from "../../data/local/localStorage";
const initialstate = {
    data:[],
    infoSchool:[],
    removed:null,
    showFormAddPerson:false,
    sectionSelected:getOptionsLocalStorage()?.find(option => option.selected).value??'Alumno'
}
const HomeProvider = ({children}) => {
    const [ homeState, dispatch ] = useReducer(reducerIds, initialstate);

    useEffect(() => {
        console.log(homeState.sectionSelected)
    },[homeState.sectionSelected]);
    const removeSelectedPerson = (persons) => {
        dispatch({
            type: types.removeSelectPerson,
            payload: persons
        });
    }
    const addInfoSchool = (info) => {
        dispatch({
            type: types.addInfoSchool,
            payload: info
        });
    }
    const addRemovePerson = (person) => {
        dispatch({
            type:types.removed,
            payload:person
        });
    }
    const formAddPerson = (visible) => {
        dispatch({
            type:types.formAddPerson,
            payload:visible
        });
    }
    const getSectionSelected = (section) => {
        dispatch({
            type:types.getSectionSelected,
            payload:section
        });
    }
    return (
        <GenerateIdContext.Provider value={{
            homeState,
            removeSelectedPerson,
            addRemovePerson,
            formAddPerson,
            addInfoSchool,
            getSectionSelected
        }}>
            {children}
        </GenerateIdContext.Provider>
    );
}

export default HomeProvider;