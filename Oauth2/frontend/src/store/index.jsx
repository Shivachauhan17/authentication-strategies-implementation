import { configureStore } from "@reduxjs/toolkit";
import windowSlice from './window-slice'

const store=configureStore({
    reducer:{
        auth:windowSlice.reducer
    }
})

export default store;