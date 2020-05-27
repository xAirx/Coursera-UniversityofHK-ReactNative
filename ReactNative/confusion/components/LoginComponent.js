import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Input, CheckBox, Tile, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from 'react-navigation';
/* import { baseUrl } from '../shared/baseurl'; */
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { Asset } from 'expo-asset';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
        container: {
                justifyContent: 'center',
                margin: 20,
        },
        imageContainer: {
                flex: 1,
                flexDirection: 'row',
                margin: 20,
        },
        image: {
                margin: 10,
                width: 50,
                height: 50,
                marginLeft: 130,
                alignItems: 'center',
                justifyContent: 'center',
        },
        formInput: { marginBottom: 30, marginTop: 10 },
        formCheckbox: {
                margin: 40,
                backgroundColor: null,
                marginBottom: -35,
                marginTop: -20,
        },
        formButton: {
                margin: 60,
        },
});
class LoginTab extends Component {
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
                });
        }

        static navigationOptions = {
                title: 'Login',
                tabBarIcon: ({ tintColor }) => (
                        <Icon name="sign-in" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />
                ),
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
                                                checked={this.state.remember}
                                                onPress={() => this.setState({ remember: !this.state.remember })}
                                                containerStyle={styles.formCheckbox}
                                        />
                                        <View style={styles.formButton}>
                                                <Button
                                                        onPress={() => this.handleLogin()}
                                                        title="Login"
                                                        icon={
                                                                <Icon
                                                                        name="sign-in"
                                                                        type="font-awesome"
                                                                        size={24}
                                                                        color="white"
                                                                />
                                                        }
                                                        buttonStyle={{
                                                                backgroundColor: '#1a515b',
                                                        }}
                                                />
                                        </View>
                                        <View style={styles.formButton}>
                                                <Button
                                                        onPress={() => this.props.navigation.navigate('Register')}
                                                        title="Register"
                                                        clear
                                                        icon={
                                                                <Icon
                                                                        name="user-plus"
                                                                        type="font-awesome"
                                                                        size={24}
                                                                        color="blue"
                                                                />
                                                        }
                                                        titleStyle={{
                                                                color: 'blue',
                                                        }}
                                                />
                                        </View>
                                </Card>
                        </Animatable.View>
                );
        }
}

class RegisterTab extends Component {
        constructor(props) {
                super(props);

                this.state = {
                        username: '',
                        password: '',
                        firstname: '',
                        lastname: '',
                        email: '',
                        remember: false,
                        imageUrl: 'http://localhost:3000/images/profilepic.png',
                };

                this.getImageFromCamera = this.getImageFromCamera.bind(this);
                this.getImagefromGallery = this.getImagefromGallery.bind(this);
        }

        getImageFromCamera = async () => {
                console.log('GETIMAGEFORMCAMERATRIGGRED');
                const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
                const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

                if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted')
                        console.log('GETIMAGEFORMCAMERATRIGGRED GRANTED');
                {
                        const capturedImage = await ImagePicker.launchCameraAsync({
                                allowsEditing: true,
                                aspect: [4, 3],
                        });
                        if (!capturedImage.cancelled) {
                                console.log(capturedImage);
                                this.processImage(capturedImage.uri);
                        }
                }
        };

        getImagefromGallery = async () => {
                console.log('GETIMAGEFORMGALLERYTRIGGERD');
                const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

                if (cameraRollPermission.status === 'granted') {
                        console.log('GETIMAGEFORMGALLERYTRIGGERD GRANTED');
                        const capturedImage = await ImagePicker.launchImageLibraryAsync({
                                allowsEditing: true,
                                aspect: [4, 3],
                        });
                        if (!capturedImage.cancelled) {
                                console.log(capturedImage);
                                this.processImage(capturedImage.uri);
                        }
                }
        };

        processImage = async imageUri => {
                const PROCESSEDIMAGE = ImageManipulator.manipulate(
                        imageUri,
                        console.log('I CRAPPED HERE ', imageUri),
                        [{ resize: { width: 400 } }],
                        console.log('I RESIZED  ', imageUri),
                        console.log('THIS IS THE PROCESSEDIMAGE', imageUri),
                        this.setState({ imageUrl: imageUri }),
                        console.log('SETTING STATE', imageUri)
                );
        };

        static navigationOptions = {
                title: 'Register',
                tabBarIcon: ({ tintColor, focused }) => (
                        <Icon name="user-plus" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />
                ),
        };

        handleRegister() {
                console.log(JSON.stringify(this.state));
                if (this.state.remember)
                        SecureStore.setItemAsync(
                                'userinfo',
                                JSON.stringify({
                                        username: this.state.username,
                                        password: this.state.password,
                                })
                        ).catch(error => console.log('Could not save user info', error));
        }

        render() {
                return (
                        <ScrollView>
                                <Animatable.View animation="fadeInDown" duration={500} delay={1000}>
                                        <Tile
                                                title="Registration Area"
                                                featured
                                                imageSrc={{ url: 'http://localhost:3000/images/login.png' }}
                                        ></Tile>
                                        <View style={styles.container}>
                                                <Card>
                                                        <Image
                                                                source={{ uri: this.state.imageUrl }}
                                                                loadingIndicatorSource="http://localhost:3000/images/profilepic.png"
                                                                style={styles.image}
                                                        />
                                                        <Button
                                                                title="Add Profile Picture"
                                                                onPress={this.getImageFromCamera}
                                                        />
                                                        <Button
                                                                title="Select from Gallery"
                                                                onPress={this.getImagefromGallery}
                                                        />
                                                        <Input
                                                                placeholder="Username"
                                                                onChangeText={username => this.setState({ username })}
                                                                value={this.state.username}
                                                                containerStyle={styles.formInput}
                                                        />
                                                        <Input
                                                                placeholder="Password"
                                                                onChangeText={password => this.setState({ password })}
                                                                value={this.state.password}
                                                                containerStyle={styles.formInput}
                                                        />
                                                        <Input
                                                                placeholder="First Name"
                                                                onChangeText={lastname => this.setState({ firstname })}
                                                                value={this.state.firstname}
                                                                containerStyle={styles.formInput}
                                                        />
                                                        <Input
                                                                placeholder="Last Name"
                                                                onChangeText={lastname => this.setState({ lastname })}
                                                                value={this.state.lastname}
                                                                containerStyle={styles.formInput}
                                                        />
                                                        <Input
                                                                placeholder="Email"
                                                                onChangeText={email => this.setState({ email })}
                                                                value={this.state.email}
                                                                containerStyle={styles.formInput}
                                                        />
                                                        <CheckBox
                                                                title="Remember Me"
                                                                center
                                                                checked={this.state.remember}
                                                                onPress={() =>
                                                                        this.setState({
                                                                                remember: !this.state.remember,
                                                                        })
                                                                }
                                                                containerStyle={styles.formCheckbox}
                                                        />
                                                        <View style={styles.formButton}>
                                                                <Button
                                                                        onPress={() => this.handleRegister()}
                                                                        title="Register"
                                                                        icon={
                                                                                <Icon
                                                                                        name="user-plus"
                                                                                        type="font-awesome"
                                                                                        size={24}
                                                                                        color="white"
                                                                                />
                                                                        }
                                                                        buttonStyle={{
                                                                                backgroundColor: '#512DA8',
                                                                        }}
                                                                />
                                                        </View>
                                                </Card>
                                        </View>
                                </Animatable.View>
                        </ScrollView>
                );
        }
}

const Login = createBottomTabNavigator(
        {
                Login: LoginTab,
                Register: RegisterTab,
        },
        {
                tabBarOptions: {
                        activeBackgroundColor: '#1a515b',
                        inactiveBackgroundColor: 'grey',
                        activeTintColor: 'white',
                        inactiveTintColor: 'white',
                        style: {
                                color: 'white',
                        },
                },
        }
);

export default Login;
