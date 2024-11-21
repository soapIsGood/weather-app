import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    user: userReducer
  },
});

export default store;
