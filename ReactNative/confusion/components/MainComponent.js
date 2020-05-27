/* eslint-disable no-useless-constructor */
/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';

/* import PropTypes from 'prop-types'; */
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../Redux/Api/ActionCreators';

import {
        LoginNavigator,
        HomeNavigator,
        AboutNavigator,
        ReservationNavigator,
        FavoritesNavigator,
        ContactNavigator,
        CustomDrawerContentComponent,
        MenuNavigator,
} from './helpers/Navigators/StackNavigators';

/* const mapStateToProps = state => {}; */

const mapDispatchToProps = dispatch => ({
        fetchDishes: dispatch(fetchDishes()),
        fetchComments: dispatch(fetchComments()),
        fetchPromos: dispatch(fetchPromos()),
        fetchLeaders: dispatch(fetchLeaders()),
});

const MainNavigator = createDrawerNavigator(
        {
                Login: {
                        screen: LoginNavigator,
                        navigationOptions: {
                                title: 'Login',
                                drawerLabel: 'Login',
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon
                                                name="sign-in"
                                                type="font-awesome"
                                                size={24}
                                                iconStyle={{ color: 'white' }}
                                        />
                                ),
                        },
                },
                Home: {
                        screen: HomeNavigator,
                        navigationOptions: {
                                title: 'Home',
                                drawerLabel: 'Home',
                                // eslint-disable-next-line react/prop-types
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon
                                                name="home"
                                                type="font-awesome"
                                                size={24}
                                                iconStyle={{ color: 'white' }}
                                        />
                                ),
                        },
                },
                About: {
                        screen: AboutNavigator,
                        navigationOptions: {
                                title: 'About us',
                                drawerLabel: 'About us',
                                // eslint-disable-next-line react/prop-types
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon
                                                name="info-circle"
                                                type="font-awesome"
                                                size={24}
                                                iconStyle={{ color: 'white' }}
                                        />
                                ),
                        },
                },
                Menu: {
                        screen: MenuNavigator,
                        navigationOptions: {
                                title: 'Menu',
                                drawerLabel: 'Menu',
                                // ADDING PROPTYPES
                                // eslint-disable-next-line react/prop-types
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon name="list" ype="font-awesome" size={24} iconStyle={{ color: 'white' }} />
                                ),
                        },
                },
                Reservation: {
                        screen: ReservationNavigator,
                        navigationOptions: {
                                title: 'Reserve Table',
                                drawerLabel: 'Reserve Table',
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon
                                                name="cutlery"
                                                type="font-awesome"
                                                size={24}
                                                iconStyle={{ color: 'white' }}
                                        />
                                ),
                        },
                },
                Favorites: {
                        screen: FavoritesNavigator,
                        navigationOptions: {
                                title: 'My Favorites',
                                drawerLabel: 'My Favorites',
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon
                                                name="heart"
                                                type="font-awesome"
                                                size={24}
                                                iconStyle={{ color: 'white' }}
                                        />
                                ),
                        },
                },
                Contact: {
                        screen: ContactNavigator,
                        navigationOptions: {
                                title: 'Contact information',
                                drawerLabel: 'Contact Us',
                                // ADDING PROPTYPES
                                // eslint-disable-next-line react/prop-types
                                drawerIcon: ({ tintColor, focused }) => (
                                        <Icon
                                                name="address-card"
                                                type="font-awesome"
                                                size={22}
                                                iconStyle={{ color: 'white' }}
                                        />
                                ),
                        },
                },
        },
        {
                initialRouteName: 'Home',
                drawerBackgroundColor: '#1a515b',
                contentComponent: CustomDrawerContentComponent,
                contentOptions: {
                        activeTintColor: 'white',
                        activeBackgroundColor: 'transparent',
                        inactiveTintColor: 'grey',
                        inactiveBackgroundColor: 'transparent',
                        labelStyle: {
                                fontSize: 15,
                                marginLeft: 10,
                        },
                },
        }
);

class Main extends Component {
        componentDidMount() {
                fetchDishes();
                fetchLeaders();
                fetchComments();
                fetchPromos();

                NetInfo.getConnectionInfo().then(connectionInfo => {
                        console.log(
                                `Initial, type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`
                        );
                });

                NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        }

        componentWillUnmount() {
                NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
        }

        handleConnectivityChange = connectionInfo => {
                switch (connectionInfo.type) {
                        case 'none':
                                console.log('You are now offline!');
                                break;
                        case 'wifi':
                                console.log('You are now connected to WiFi!');
                                break;
                        case 'cellular':
                                console.log('You are now connected to Cellular!');
                                break;
                        case 'unknown':
                                console.log('You now have unknown connection!');
                                break;
                        default:
                                break;
                }
        };

        render() {
                return (
                        /* <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                         */ <MainNavigator />
                        /* </View>
                         */
                );
        }
}
export default connect(null, mapDispatchToProps)(Main);
