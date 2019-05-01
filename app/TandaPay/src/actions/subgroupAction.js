import {SET_CURRENT_SUBGROUP} from './types';

export const setSubgroup = subgroupData => dispatch =>{
    dispatch({
        type: SET_CURRENT_SUBGROUP,
        payload: subgroupData
    });
};

export const removeSubgroup = () => dispatch => {
    dispatch({
        type: SET_CURRENT_SUBGROUP,
        payload: {}
    });
}