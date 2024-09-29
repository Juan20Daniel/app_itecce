import { types } from "../types/types";
export const reducerIds = (state, action) => {
    switch (action.type) {
        case types.addImage:
            return {
                ...state,
                images:[...state.images, action.payload]
            }
        case types.removeImage:
            return {
                ...state,
                images:action.payload
            }
        case types.addSelectPerson:
            return {
                ...state,
                selectedPersons:[...state.selectedPersons, action.payload]
            }
        case types.removeSelectPerson:
            return {
                ...state,
                selectedPersons: action.payload
            }
        case types.addInfoSchool:
            return {
                ...state,
                infoSchool:[...state.infoSchool, ...action.payload]
            }
        case types.modalSelectedPersons:
            return {
                ...state,
                showSelectedPersons:action.payload
            }
        case types.addPersons:
            return {
                ...state,
                data:[...state.data, ...action.payload]
            }
        case types.removed:
            return {
                ...state,
                removed:action.payload
            }
        case types.formAddPerson:
            return {
                ...state,
                showFormAddPerson:action.payload
            }
        case types.addImages:
            return {
                ...state,
                images:[...state.images, ...action.payload]
            }
        default:
            return state;
    }
}