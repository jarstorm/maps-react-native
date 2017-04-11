import { Actions } from 'react-native-router-flux';
import {
  LOADED_MAP,
  MARK_CREATED,
  REGION_CHANGED
} from './types';
import RestApi from '../rest/RestApi';

export const mapFetch = (latitude, longitude) => {

  return (dispatch) => {
    
    const restApi = new RestApi();

    restApi.mapFetch(latitude, longitude).then((data) => {
      console.log(data);
      dispatch({
        type: LOADED_MAP,
        payload: data
      });
    });
  };
};

export const createMark = (markData) => {

  return (dispatch) => {
    
    const restApi = new RestApi();

    restApi.createMark(markData).then((data) => {
      console.log(data);
      dispatch({
        type: MARK_CREATED,
        payload: data
      });
    });
  };
};

export const regionChanged = (region) => {
  return {
    type: REGION_CHANGED,
    payload: region
  };
};