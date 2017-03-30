import RestClient from 'react-native-rest-client';
import axios from 'axios';

export default class RestApi {
  createUser (user, password, email) {    
    return axios.post('https://jarstorm-maps.herokuapp.com/users', {
      "username": user,
      password,
      email
    });  
  };
};