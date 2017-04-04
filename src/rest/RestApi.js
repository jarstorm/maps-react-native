import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default class RestApi {

  getRestUrl() {
  	return 'https://jarstorm-maps.herokuapp.com';
  }

  createUser (user, password, email) {   
    return axios.post(this.getRestUrl() + '/users', {
      "username": user,
      password,
      email
    });  
  };

  loginUser (user, password) {   
    return axios.post(this.getRestUrl() + '/auth/login', {
      "username": user,
      password
    });  
  };

  secureCall(callback) {
  	let that = this;
	this.getToken().then((token) => {
  		callback(token, that.getRestUrl());
  	});
  }

  async mapFetch(latitude, longitude) {
  	console.log(latitude, longitude);
  	return await this.getToken().then((token) => {
  		 return axios.get(this.getRestUrl() + '/map', {
  			headers: {'Authorization': token},
  			data: {
  				latitude,
  				longitude
  			}
		  });
  		 }).then((data) => {
			console.log(data);
			return data.data;
		});  
  	
  };

  async getToken() {  
	  return await AsyncStorage.getItem('AuthToken').then((token) => {	  	
	  	return token;
	  });
  };
};