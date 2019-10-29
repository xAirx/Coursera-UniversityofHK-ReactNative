/* eslint-disable react/display-name */
import React, { Component } from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Reservation from './ReservationComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from '../Redux/Api/ActionCreators';

/* const mapStateToProps = state => {}; */
const mapDispatchToProps = dispatch => ({
  fetchDishes: dispatch(fetchDishes()),
  fetchComments: dispatch(fetchComments()),
  fetchPromos: dispatch(fetchPromos()),
  fetchLeaders: dispatch(fetchLeaders()),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      // Hvor kommer disse navigation options fra ?
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    DishDetail: { screen: DishDetail },
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
    },
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: 'white' }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

// Display logo and stuff inside drawer
const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            // eslint-disable-next-line global-require
            source={require('./images/logo.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      {/*      EXPLAIN  whatever the props are just pass it into the drawer items, rest operator.
       */}
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
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
    drawerBackgroundColor: '#D1C4E9',
    // Setting drawer component here
    contentComponent: CustomDrawerContentComponent,
  }
);

class Main extends Component {
  componentDidMount() {
    fetchDishes();
    fetchLeaders();
    fetchComments();
    fetchPromos();
  }

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
