import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer
  }
});