import RestClient from 'react-native-rest-client';
import RestKit from 'react-native-rest-kit';

export default class RestApi {
  
   createUser (user, password, email, callback) {    
    const url = 'https://jarstorm-maps.herokuapp.com/users';
    let request = {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "username": user,
          password,
          email
      })
    };

    RestKit.send(url, request, function(error, json){
      callback(error, json);
    });
  };
};