import RestClient from 'react-native-rest-client';
import axios from 'axios';

export default class RestApi {
  createUser (user, password, email) {    
    return axios.post('http://localhost:4567/users', {
      "username": user,
      password,
      email
    });  
  };
};