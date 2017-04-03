import {
  LOADED_MAP
} from '../actions/types';

const INITIAL_STATE = {
  marks: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED_MAP:
      return { ...state, marks: action.payload };
    default:
      return state;
  }
};
