import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSliceReducer from 'Redux/Slices/AuthSlice';
export default configureStore({
    reducer: {
        auth: authSliceReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
