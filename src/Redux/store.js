import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSliceReducer from 'Redux/Slices/AuthSlice';
import bookSliceReducer from 'Redux/Slices/BookSlice';
import shelfSliceReducer from 'Redux/Slices/ShelfSlice';
export default configureStore({
    reducer: {
        auth: authSliceReducer,
        book: bookSliceReducer,
        shelf: shelfSliceReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
