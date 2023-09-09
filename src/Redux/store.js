import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSliceReducer from 'Redux/Slices/AuthSlice';
import bookSliceReducer from 'Redux/Slices/BookSlice';
export default configureStore({
    reducer: {
        auth: authSliceReducer,
        book: bookSliceReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
