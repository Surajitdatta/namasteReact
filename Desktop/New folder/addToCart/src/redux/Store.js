import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";

export const Store = configureStore({
    reducer:{
        cart:cartReducer
    }

})