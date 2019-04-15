import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tandaReducer from './tandaReducer';
import subgroupReducer from './subgroupReducer';

const reducers =  combineReducers({
  auth: authReducer,
  tanda: tandaReducer,
  subgroup: subgroupReducer
});

export default {
  reducer: reducers
};