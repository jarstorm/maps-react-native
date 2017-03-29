import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner, Confirm } from './common';
import MapView from 'react-native-maps';

class LoginForm extends Component {
  state = { showModal: false, mark: [] };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  animate() {
    this.setState({ showModal: !this.state.showModal });
  }

onAccept() {
    console.log("accept");
    this.setState({ showModal: false });
}

onDecline() {
    console.log("onDecline");
    this.setState({ showModal: false });
}

mapPress(event) {
  let array = this.state.mark.slice();
  array.push(event.nativeEvent.coordinate);
  this.setState({mark: array});
}

renderElements() {
return this.state.mark.map((coordinate) => {
  return (
    <MapView.Marker.Animated coordinate={coordinate} />
  );
});
}
  render() {
    let {container, map} = styles;

    return (
      <View style={container}>
        <MapView style={map} onPress={this.mapPress.bind(this)}>
        {this.renderElements()}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.animate.bind(this)}
            style={[styles.bubble, styles.button]}
          >
            <Text>Animate</Text>
          </TouchableOpacity>
        </View>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>

      </View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
};


const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
