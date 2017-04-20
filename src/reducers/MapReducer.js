import {
  LOADED_MAP,
  REGION_CHANGED,
  ADD_BUTTON_PRESSED,
  MARK_CREATED
} from '../actions/types';

const INITIAL_STATE = {
  marks: [],
  region: {
  	latitude: 0,
  	longitude: 0
  },
  addButtonPressed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED_MAP:
      return { ...state, marks: action.payload };
    case REGION_CHANGED:
      return { ...state, region: action.payload };  
    case ADD_BUTTON_PRESSED:
      return { ...state, addButtonPressed: true };  
    case MARK_CREATED:
      return { ...state, addButtonPressed: false };       
    default:
      return state;
  }
};
