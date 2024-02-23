import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import characterReducer from './slices/characterSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    character: characterReducer,
  },
});

export default store;
