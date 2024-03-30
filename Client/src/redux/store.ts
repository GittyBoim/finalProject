import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';
import rideSlice from './slices/ride.slice';
import feedbackSlice from './slices/feedback.slice';

const store = configureStore({
    reducer: {
        userSlice,
        rideSlice,
        feedbackSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
    
});


export default store;