import { configureStore } from "@reduxjs/toolkit";
import credencialesSlice from './dataSlice';
export const store = configureStore({
    reducer: {
        credenciales: credencialesSlice
    }
})