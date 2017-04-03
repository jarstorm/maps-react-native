import { Actions } from 'react-native-router-flux';
import {
  LOADED_MAP
} from './types';
import RestApi from '../rest/RestApi';

export const mapFetch = () => {

  return (dispatch) => {
    
    const restApi = new RestApi();

    restApi.mapFetch().then((data) => {
      console.log(data);
      dispatch({
        type: LOADED_MAP,
        payload: data
      });
    });
  };
};
