import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import profileSlice from "./slices/ProfileSlice";
import mainSlice from "./slices/MainSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        main: mainSlice,
    }
});

export default store;