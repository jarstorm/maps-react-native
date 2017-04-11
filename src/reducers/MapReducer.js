import {
  LOADED_MAP,
  REGION_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  marks: [],
  region: {
  	latitude: 0,
  	longitude: 0
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED_MAP:
      return { ...state, marks: action.payload };
    case REGION_CHANGED:
      return { ...state, region: action.payload };  
    default:
      return state;
  }
};
