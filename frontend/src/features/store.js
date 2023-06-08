import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers';


export const store = configureStore({
    reducer: rootReducer,
  });

  