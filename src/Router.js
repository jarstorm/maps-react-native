import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainMapComponent from './components/MainMapComponent';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
        <Scene key="register" component={RegisterForm} title="Please Register" />
      </Scene>

      <Scene key="main">
        <Scene key="map" component={MainMapComponent} title="map" initial/>        
      </Scene>
    </Router>
  );
};

export default RouterComponent;
