import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import workReducer from '../features/working/workslice';



const rootReducer = combineReducers({
  auth: authReducer,
  work: workReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});