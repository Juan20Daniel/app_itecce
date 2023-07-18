import { createSlice } from "@reduxjs/toolkit";
import { select } from '../functions';
const credencialesSlice = createSlice({
    name:'credenciales',
    initialState:{
        data:[],
        breadCrumbs:[],
        optionsNav: [
            { id:1, active:false },
            { id:2, active:false },
            { id:3, active:false },
            { id:4, active:false },
            { id:5, active:false },
            { id:6, active:false },
        ],
        alert: [{ active:false, icon:'', message:'' }],
        menuOpIds:false,
        loading: { status:false, value:"" },
        idToMake:[],
        modalAlert:{ state:false, icon:'', message:'', actionOK:false },
        editExpireDate: false,
    },
    reducers: {
        getBreadCrumbs: (state, action) => {
            state.breadCrumbs =  action.payload;
        },
        selector: (state, action) => {
            state.optionsNav = select(state.optionsNav, action.payload);
        },
        statePage: (state, action) => {
            state.optionsNav = select(state.optionsNav, action.payload.id);
        },
        activeAlert: (state, action) => {
            state.alert = [action.payload];
        },
        loader: (state, action) => {
            state.loading = action.payload;
        },
        getIdToGenerate: (state, action) => {
            state.idToMake = action.payload;
        },
        controlModalAlert: (state, action) => {
            state.modalAlert = action.payload;
        },
        setEditExpireDate: (state, action) => {
            state.editExpireDate = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { getBreadCrumbs, selector, statePage, activeAlert, loader, getIdToGenerate, controlModalAlert, setEditExpireDate, setData } = credencialesSlice.actions;

export default credencialesSlice.reducer;