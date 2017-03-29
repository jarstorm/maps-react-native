import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBVVcMrhr-b-yxw_QJEfixAKGo2HDQG8A8",
      authDomain: "react-native-manager-1a5cf.firebaseapp.com",
      databaseURL: "https://react-native-manager-1a5cf.firebaseio.com",
      storageBucket: "react-native-manager-1a5cf.appspot.com",
      messagingSenderId: "362679750864"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
