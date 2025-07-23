import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';
import foodReducer from '../slices/food/foodSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
  },
});
