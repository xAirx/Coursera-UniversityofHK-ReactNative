import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  formInput: {
    margin: 40,
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false,
    };
  }

  // //////////// SecureStore //////////////
  componentDidMount() {
    SecureStore.getItemAsync('userinfo').then(userdata => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
      console.log('THIS IS THE USERINFO', userinfo);
    });
  }

  static navigationOptions = {
    title: 'Login',
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));

    const { remember, username, password } = this.state;

    if (remember)
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: { username },
          password: { password },
        })
      ).catch(error => console.log('Could not save user info', error));
    else
      SecureStore.deleteItemAsync('userinfo').catch(error =>
        console.log('Could not delete user info', error)
      );
  }

  // ///////////////////////////////////////

  render() {
    const { remember, username, password } = this.state;

    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={u => this.setState({ username: u })}
          value={username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={p => this.setstate({ password: p })}
          value={password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={remember}
          onPress={() => this.setState({ remember: !remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            color="#512DA8"
          />
        </View>
      </View>
    );
  }
}
