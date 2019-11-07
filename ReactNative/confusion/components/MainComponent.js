/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

/* import PropTypes from 'prop-types'; */
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';

import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from '../Redux/Api/ActionCreators';

/* import {
  IOSHandleConnectivityChange,
  IOSInitialConnectivity,
  IOSRemoveListener,
} from './helpers/PlatformCheck/ios/ios';
import {
  AndroidHandleConnectivityChange,
  AndroidInitialConnectivity,
  AndroidRemoveListener,
} from './helpers/PlatformCheck/android/android'; */

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
            iconStyle={{ color: tintColor }}
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
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
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
            color={tintColor}
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
          <Icon name="list" ype="font-awesome" size={24} color={tintColor} />
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
            iconStyle={{ color: tintColor }}
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
            iconStyle={{ color: tintColor }}
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
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent,
  }
);

class Main extends Component {
  constructor(props) {
    super(props);
    /*   this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
      this.InitialConnectivity = this.InitialConnectivity.bind(this);
      this.RemoveConnectivity = this.RemoveConnectivity.bind(this); */
  }

  componentDidMount() {
    fetchDishes();
    fetchLeaders();
    fetchComments();
    fetchPromos();

    // /////////////// NETINFO ////////////////////////

    // Platform check

    // Add eventlistener for all.
    /*  this.InitialConnectivity();
    this.handleConnectivityChange(); */
  }

  componentWillUnmount() {
    /*  this.RemoveConnectivity(); */
  }

  /* InitialConnectivity = () => {
    console.log('INITIALCONNECTIVITY FROM MAINCOMP CALLED');
    Platform.select({
      ios: () => require(<IOSInitialConnectivity />),
      android: () => require(<AndroidInitialConnectivity />),
    });
  };

  handleConnectivityChange = () => {
    console.log('HANDLECONNECTIVITY FROM MAINCOMP CALLED');
    Platform.select({
      ios: () => require(<IOSHandleConnectivityChange />),
      android: () => require(<AndroidHandleConnectivityChange />),
    });
  };

  RemoveConnectivity = () => {
    console.log('REMOVECONNECTIVITY FROM MAINCOMP CALLED');
    Platform.select({
      ios: () => require(<IOSRemoveListener />),
      android: () => require(<AndroidRemoveListener />),
    });
  };
 */
  // ///////////////////////////////////////////////

  render() {
    return (
      /* <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
       */ <MainNavigator />
      /* </View>
       */
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Main);
