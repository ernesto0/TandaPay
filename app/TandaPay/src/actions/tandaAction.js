import {SET_CURRENT_TANDA} from './types';
import {RESET_CURRENT_TANDA} from './types';
import {REMOVE_CURRENT_TANDA} from './types'


export const setTanda = tandaData => dispatch =>{
    dispatch({
        type: SET_CURRENT_TANDA,
        payload: tandaData
    });
};

export const removeTanda = () => dispatch => {
    dispatch({
        type: REMOVE_CURRENT_TANDA,
        payload: {}
    });
}

export const resetTanda = tandaData => dispatch =>{
    dispatch({
        type: RESET_CURRENT_TANDA,
        payload: tandaData
    });
};