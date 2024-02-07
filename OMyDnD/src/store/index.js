import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Components/Register/index.js'; 

export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});
