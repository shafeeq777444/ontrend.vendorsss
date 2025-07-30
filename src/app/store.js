import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';
import foodReducer from '../slices/food/foodSlice';
import orderReducer from '../slices/order/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    order: orderReducer,
  },
});
