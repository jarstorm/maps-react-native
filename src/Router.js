import React, {Component} from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainMapComponent from './components/MainMapComponent';
import Menu from './Menu';
import SideMenu from 'react-native-side-menu';

class RouterComponent extends Component {

componentWillMount() {
  this.setState({isOpen: false});
  console.log("mount");
}
componentWillUpdate() {
  console.log("update");
}
 
onMenuItemSelected(element) {
  console.log(element);
}
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

showRouterMenu() {
  console.log("llego a show menu", this);
  this.setState({isOpen: !this.state.isOpen});
  console.log(this.state.isOpen);
}

// Hay un bug con el menu. Hay que llamar al refresh con lo que el primer click no funciona
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    


  return (
        <SideMenu
        menu={menu}
        disableGestures={true}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>

    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
        <Scene key="register" component={RegisterForm} title="Please Register" />
      </Scene>

      <Scene key="main">
        <Scene key="map" component={MainMapComponent}         
        title="Near points" initial
        onLeft={() => Actions.refresh({onLeft: this.showRouterMenu.bind(this)})}
        leftTitle="Menu"/>        
      </Scene>
    </Router>
    </SideMenu>
  )
}
};

export default RouterComponent;
