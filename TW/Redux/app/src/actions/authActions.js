import {SET_CURRENT_USER} from './types';

export const setUser = userData => dispatch =>{
    dispatch({
        type: SET_CURRENT_USER,
        payload: userData
    });
};

export const logoutUser = () => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};