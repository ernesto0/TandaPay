import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    
);

export default store;