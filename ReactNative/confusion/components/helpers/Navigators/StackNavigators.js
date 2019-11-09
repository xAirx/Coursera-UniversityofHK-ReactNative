import React from 'react';
import { createStackNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  View,
  /*  Platform, */
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Home from '../../HomeComponent';
import Contact from '../../ContactComponent';
import About from '../../AboutComponent';
import Favorites from '../../FavoriteComponent';
import Login from '../../LoginComponent';
import Reservation from '../../ReservationComponent';
import Menu from '../../MenuComponent';
import DishDetail from '../../DishDetailComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a515b',
  },
  drawerHeader: {
    backgroundColor: '#1a515b',
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
    backgroundColor: '#1a515b',
    margin: 10,
    width: 80,
    height: 60,
  },
});

export const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      // Hvor kommer disse navigation options fra ?
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#1a515b',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
        },
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            iconStyle={{ color: 'white', marginLeft: 20 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    DishDetail: { screen: DishDetail },
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{
            color: 'white',
            marginLeft: 20,
            backgroundColor: 'transparent',
          }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

export const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: 'white', marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
export const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: 'white', marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
export const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          iconStyle={{ color: 'white', marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
export const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          iconStyle={{ color: 'white', marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

export const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: 'white', marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

export const LoginNavigator = createStackNavigator(
  {
    Login: { screen: Login },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1a515b',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: '#fff',
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: 'white', marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

// Display logo and stuff inside drawer
export const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        {/*   <View
          style={{
            flex: 1,
            alignItems: 'left',
            justifyContent: 'left',
          }}
        > */}
        {/*  <Image
            // eslint-disable-next-line global-require
            source={require('./images/logo.png')}
            style={styles.drawerImage}
          /> */}
        {/* </View> */}
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Fusion</Text>
        </View>
      </View>
      {/*      EXPLAIN  whatever the props are just pass it into the drawer items, rest operator.
       */}
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
