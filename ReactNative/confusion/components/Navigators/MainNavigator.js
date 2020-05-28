/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import { createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  LoginNavigator,
  HomeNavigator,
  AboutNavigator,
  ReservationNavigator,
  FavoritesNavigator,
  ContactNavigator,
  CustomDrawerContentComponent,
  MenuNavigator,
} from './StackNavigators';

export default function MainNavigator(props) {
  const mainNavigator = createDrawerNavigator(
    {
      Login: {
        screen: LoginNavigator,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="sign-in" type="font-awesome" size={24} iconStyle={{ color: 'white' }} />
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
            <Icon name="home" type="font-awesome" size={24} iconStyle={{ color: 'white' }} />
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
            <Icon name="info-circle" type="font-awesome" size={24} iconStyle={{ color: 'white' }} />
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
            <Icon name="cutlery" type="font-awesome" size={24} iconStyle={{ color: 'white' }} />
          ),
        },
      },
      Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="heart" type="font-awesome" size={24} iconStyle={{ color: 'white' }} />
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
            <Icon name="address-card" type="font-awesome" size={22} iconStyle={{ color: 'white' }} />
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

  return mainNavigator;
}
