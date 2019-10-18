import React, { Component } from 'react';
import { View, SafeAreaView, Platform } from 'react-native';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
// Will use menu component and dishdetail component and set up navigation between the two.
//and create menunavigator component which we can use
const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail },
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        }
    }
}
);

// the create stacknavigator provifes the st atusbar and title if we dont use createstacknabvigator we wont have access to these.
const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        }
    }
}
);
const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact },
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        }
    }
}
);
const AboutNavigator = createStackNavigator({
    About: { screen: About },
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        }
    }
}
);
const MainNavigator = createDrawerNavigator({
    Home:
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
	  },
	  About:
      { screen: AboutNavigator,
        navigationOptions: {
          title: 'About us',
          drawerLabel: 'About us'
        },
      },
    Menu:
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        },
	  },
	Contact:
      { screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact information',
          drawerLabel: 'Contact Us'
        },
	  },
}, {
drawerBackgroundColor: '#D1C4E9'
});

class Main extends Component {
    ////////////// Removed because its moved to menucomponent and dishdetailcomponent. ////////////
    /*  constructor(props) {
         super(props);
         this.state = {
             dishes: DISHES,
             selectedDish: null
         };
     } */
    // When we select a dish we set the state.
    // The id grabbed here is sent from MenuComponent.js
    // DishDetail then recieves the data based on the chosen ID from our state.
    /*
        dishprops & onpress handler sent to -> menucomponent (Items with text redered looped through list then into flatlist )
        menucomponent sends clicked id from "element clicked" to our ondishselect here, and sets state
        this state is then passed to dishdetailcomponent which renders dish based on the ID */
    /* onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    } */
    ////////////////////////////////////////////////
    render() {
        return (
            <View style={{ flex: 1 }}>
            {/*     <SafeAreaView> */}
                <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                    <MainNavigator />
                </View>
                    {/* OLD CODE. */}
                    {/* Passing props to dishdetailcomp, passing dishId to our onpress. */}
                    {/*     <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} /> */}
                    {/* passing down the dishes to dishdetail of which matches the chosen ID of our onpress that has sent the id to the state. */}
                    {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                    {/* Filter on dish where id is equal to the passed id in the state. */}
    {/*             </SafeAreaView> */}
            </View >
        );
    }
}
export default Main;
