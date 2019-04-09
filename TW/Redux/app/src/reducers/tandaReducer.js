import { SET_CURRENT_TANDA } from '../actions/types';

const initialState = {
    tanda: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_TANDA:
        return {
          ...state,
          tanda: action.payload
        };
      default:
        return state;
    }
  }