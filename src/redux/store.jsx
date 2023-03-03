import { configureStore } from "@reduxjs/toolkit";
import courseReducer from './courseSlice'

const Store = configureStore ({
    reducer:{
        Course: courseReducer,
    },
});

export default Store;