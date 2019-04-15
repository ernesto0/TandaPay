import { SET_CURRENT_SUBGROUP } from '../actions/types';

const initialState = {
    subgroup: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_SUBGROUP:
        return {
          ...state,
          subgroup: action.payload
        };
      default:
        return state;
    }
  }