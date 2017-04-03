import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  USER_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';
import RestApi from '../rest/RestApi';

export const userChanged = (text) => {
  return {
    type: USER_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const registerUser = ({ user, email, password }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });

    const restApi = new RestApi();

    restApi.createUser(user, password, email)
      .then(response => registerUserSuccess(dispatch, response.data.token))   // Successfully logged in                         
      .catch(err => registerUserFail(dispatch, err));  // Catch any error 
  };
};


export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const registerUserFail = (dispatch, error) => {
  console.log(error);
  dispatch({ type: REGISTER_USER_FAIL });
};

const registerUserSuccess = (dispatch, token) => {

  try {
    AsyncStorage.setItem('AuthToken', token);
  } catch (error) {
    console.log("Could not set token", error);
  }

  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: token
  });

  Actions.main();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
