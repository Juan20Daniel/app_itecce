import { createSlice } from "@reduxjs/toolkit";
const credencialesSlice = createSlice({
    name:'credenciales',
    initialState: {
        user:false,
    },
    reducers: {
        saveUser:(state, action) => {
            state.user = action.payload;
        }
    }
});

export const {
    saveUser
} = credencialesSlice.actions;

export default credencialesSlice.reducer;