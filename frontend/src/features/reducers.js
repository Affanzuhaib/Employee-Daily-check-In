import { combineReducers } from 'redux';
import userReducer from './userSlice';
// import other reducers as needed

const rootReducer = combineReducers({
  user: userReducer,
  // add other reducers here
});

export default rootReducer;

