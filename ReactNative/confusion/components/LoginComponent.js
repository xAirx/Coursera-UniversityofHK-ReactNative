import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Input, CheckBox, Tile } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  formInput: { marginBottom: 30, marginTop: 30 },
  formCheckbox: {
    margin: 40,
    backgroundColor: null,
    marginBottom: -30,
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
      <Animatable.View animation="fadeInDown" duration={500} delay={1000}>
        <Tile
          title="Login Area"
          featured
          imageSrc={{ url: 'http://localhost:3000/images/login.png' }}
        ></Tile>
        <Card>
          <Input
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            onChangeText={password => this.setstate({ password })}
            value={password}
            color="#1a515b"
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            iconType="material"
            checkedIcon="clear"
            uncheckedIcon="add"
            checkedColor="red"
            checked={remember}
            onPress={() => this.setState({ remember: !remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleLogin()}
              title="Login"
              color="#1a515b"
              buttonStyle={{ backgroundColor: '#1a515b' }}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
}
