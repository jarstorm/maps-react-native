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

  secureCall(callback) {
  	let that = this;
	this.getToken().then((token) => {
  		callback(token, that.getRestUrl());
  	});
  }

  async mapFetch() {
  	return await this.getToken().then((token) => {
  		 return axios.get(this.getRestUrl() + '/map', {
  			headers: {'Authorization': token}
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