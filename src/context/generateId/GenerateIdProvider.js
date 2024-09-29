import { useReducer, useEffect } from "react";
import { reducerIds } from "../../reducer/reducerIds";
import { types } from "../../types/types";
import GenerateIdContext from "./GenerateIdContext";
const initialstate = {
    data:[],
    images:[],
    selectedPersons:[],
    infoSchool:[],
    removed:null,
    showFormAddPerson:false,
    showSelectedPersons:false
}
const GenerateIdProvider = ({children}) => {
    const [ generateIdState, dispatch ] = useReducer(reducerIds, initialstate);
    useEffect(() => {
        //Cerrar el modal en caso de que no haya nada seleccionado
        if(generateIdState.selectedPersons.length === 0) modalSelectedPersons(false);
    },[generateIdState.selectedPersons]);
    const addImage = (img_object) => {
        dispatch({
            type: types.addImage,
            payload: img_object
        });
    }
    const addImages = (images) => {
        dispatch({
            type:types.addImages,
            payload: images
        })
    }
    const removeImage = (images) => {
        dispatch({
            type: types.removeImage,
            payload: images
        });
    }
    const addSelectedPerson = (person_object) => {
        dispatch({
            type: types.addSelectPerson,
            payload: person_object
        });
    }
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
    const modalSelectedPersons = (visible) => {
        dispatch({
            type:types.modalSelectedPersons,
            payload:visible
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
            addImages,
            addImage,
            removeImage,
            addSelectedPerson,
            addInfoSchool,
            removeSelectedPerson,
            modalSelectedPersons,
            addRemovePerson,
            formAddPerson
        }}>
            {children}
        </GenerateIdContext.Provider>
    );
}

export default GenerateIdProvider;