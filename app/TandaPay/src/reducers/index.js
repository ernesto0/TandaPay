import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tandaReducer from './tandaReducer';
import subgroupReducer from './subgroupReducer';

export default combineReducers({
  auth: authReducer,
  tanda: tandaReducer,
  subgroup: subgroupReducer
});