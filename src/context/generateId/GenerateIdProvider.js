import { useReducer } from "react";
import { reducerIds } from "../../reducer/reducerIds";
import { types } from "../../types/types";
import GenerateIdContext from "./GenerateIdContext";
const initialstate = {
    data:[],
    images:[],
    infoSchool:[],
    infoIdentityCard:[],
    infoIdentityCardNotFound:[],
    removed:null,
    showFormAddPerson:false,
}
const GenerateIdProvider = ({children}) => {
    const [ generateIdState, dispatch ] = useReducer(reducerIds, initialstate);
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
    const addInfoIdentityCard = (info) => {
        dispatch({
            type: types.addInfoIdentityCard,
            payload: info
        });
    }
    const addInfoIdentityCardHotFound = (info) => {
        dispatch({
            type: types.addInfoIdentityCardNotFound,
            payload: info
        })
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
            removeImage,
            addSelectedPerson,
            addInfoIdentityCard,
            addInfoIdentityCardHotFound,
            removeSelectedPerson,
            addRemovePerson,
            formAddPerson,
            addInfoSchool
        }}>
            {children}
        </GenerateIdContext.Provider>
    );
}

export default GenerateIdProvider;