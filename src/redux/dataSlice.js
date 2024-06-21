import { createSlice } from "@reduxjs/toolkit";
const credencialesSlice = createSlice({
    name:'credenciales',
    initialState: {
        user:false,
        centralAlert:{visible:false, title:'', message:'', type:''},
        modalShowFile: false,
        images:[]
    },
    reducers: {
        setModalShowFile:(state, action) => {
            state.modalShowFile = action.payload;
        },
        setCentralAlert: (state, action) => {
            state.centralAlert =  action.payload;
        },
        saveUser:(state, action) => {
            state.user = action.payload;
        },
        setImages: (state, action) => {
            state.images.push(action.payload)
        },
        setRemoveImg: (state, action) => {
            state.images = action.payload;
        }
    }
});

export const {
    setModalShowFile,
    setCentralAlert,
    saveUser,
    setImages,
    setRemoveImg
} = credencialesSlice.actions;

export default credencialesSlice.reducer;