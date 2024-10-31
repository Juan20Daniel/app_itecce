import { useReducer } from "react";
import { reducerIds } from "../../reducer/reducerIds";
import { types } from "../../types/types";
import GenerateIdContext from "./HomeContext";
const initialstate = {
    data:[],
    infoSchool:[],
    removed:null,
    showFormAddPerson:false,
}
const HomeProvider = ({children}) => {
    const [ generateIdState, dispatch ] = useReducer(reducerIds, initialstate);
   
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
    return (
        <GenerateIdContext.Provider value={{
            generateIdState,
            removeSelectedPerson,
            addRemovePerson,
            formAddPerson,
            addInfoSchool
        }}>
            {children}
        </GenerateIdContext.Provider>
    );
}

export default HomeProvider;