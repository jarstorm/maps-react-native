import {
  USER_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTO_LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  user: '',
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  initialLoading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CHANGED:
      return { ...state, user: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case AUTO_LOGIN_USER_FAIL:
      return { ...state, ...INITIAL_STATE, initialLoading: false };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };  
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, token: action.payload };
    case REGISTER_USER_FAIL:
      return { ...state, error: 'Register Failed.', password: '', loading: false };
    default:
      return state;
  }
};
