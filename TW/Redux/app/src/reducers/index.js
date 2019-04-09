import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tandaReducer from './tandaReducer';

export default combineReducers({
  auth: authReducer,
  tanda: tandaReducer
});