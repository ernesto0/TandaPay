import {SET_CURRENT_TANDA} from './types';

export const setTanda = tandaData => dispatch =>{
    dispatch({
        type: SET_CURRENT_TANDA,
        payload: tandaData
    });
};

export const removeTanda = () => dispatch => {
    dispatch({
        type: SET_CURRENT_TANDA,
        payload: {}
    });
}