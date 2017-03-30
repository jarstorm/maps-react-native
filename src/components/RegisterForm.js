import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { userChanged, emailChanged, passwordChanged, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {
  onUserChange(text) {
    this.props.userChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { user, email, password } = this.props;

    this.props.registerUser({ user, email, password });
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
        <Button onPress={this.onButtonPress.bind(this)}>
          Register
        </Button>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Username"
            placeholder="username"
            onChangeText={this.onUserChange.bind(this)}
            value={this.props.user}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
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
          {this.renderRegisterButton()}
        </CardSection>
      </Card>
    );
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
  const { user, email, password, error, loading } = auth;

  return { user, email, password, error, loading };
};

export default connect(mapStateToProps, {
  userChanged, emailChanged, passwordChanged, registerUser
})(RegisterForm);
