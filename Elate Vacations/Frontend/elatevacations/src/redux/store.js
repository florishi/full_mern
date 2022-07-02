import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./features/authslice";
import TourReducer from "./features/tourslice";

const store = configureStore({
    reducer:{
        auth: AuthReducer,
        tour: TourReducer
    }
});

export default store;