import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default class RestApi {

  getRestUrl() {
  	//return 'https://jarstorm-maps.herokuapp.com';
  	return 'http://localhost:4567';
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
  			params: {
  				latitude,
  				longitude
  			}
		  });
  		 }).then((data) => {
			console.log(data);
			return data.data;
		}).catch(error => console.log(error));  
  };

async createMark(markData) {
  	console.log(markData);
  	const {name, description, geo} = markData;
  	return await this.getToken().then((token) => {
  		 return axios.post(this.getRestUrl() + '/map', 
			{
  				name,
  				description, 
  				geo
  			},
  		 {
  			headers: {authorization: token}
		  });
  		 }).then((data) => {
			console.log(data);
			return data.data;
		}).catch(error => console.log(error));  
  };

  async getToken() {  
	  return await AsyncStorage.getItem('AuthToken').then((token) => {	  	
	  	return token;
	  });
  };
};