import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { autoLogin, userChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  componentWillMount() {
    this.props.autoLogin();
  }

  onUserChange(text) {
    this.props.userChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { user, password } = this.props;

    this.props.loginUser({ user, password });
  }

 onRegisterButtonPress() {
   Actions.register();
 }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderRegisterButton() {
    if (!this.props.loading) {
      return (
        <Button onPress={this.onRegisterButtonPress.bind(this)}>
          Register
        </Button>
      );
    }
  }

renderForm() {
    if (this.props.initialLoading) {
      console.log("loading");
      return (
        <Spinner size="large" />
      );
    } else {
      console.log("not loading");
      return (
        <Card>
          <CardSection>
            <Input
              label="User"
              placeholder="username"
              onChangeText={this.onUserChange.bind(this)}
              value={this.props.user}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderLoginButton()}
          </CardSection>
          <CardSection>
            {this.renderRegisterButton()}
          </CardSection>
        </Card>
      )
    }
  }

  render() {
    return this.renderForm();
  }
}
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { user, password, error, loading, initialLoading } = auth;

  return { user, password, error, loading, initialLoading };
};

export default connect(mapStateToProps, {
  autoLogin, userChanged, passwordChanged, loginUser
})(LoginForm);
