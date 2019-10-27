import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { DISHES } from '../shared/dishes';

// We will  make a class component here because we need to move the state into all of our components to get it ready with redux.

class Menu extends Component {
  /* function Menu(props) { */
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  // Local Navigation options ...

  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    /* const { navigate } = this.props; */
    const { dishes } = this.state;

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => (
      // We set the ITEM and Key here we want to loop over.
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron
        onPress={() => navigate('DishDetail', { dishId: item.id })}
        // eslint-disable-next-line global-require
        leftAvatar={{ source: require('./images/uthappizza.png') }}
      />
    );

    // our props for this component will conatain one propery named navigation, we are extracting it here.
    // When we press an item in the menucomponent  we will pass this information to dishdetailcomponent with the navigator

    return (
      // Will iterate over each item in the array, in the view given from rendermenuitem.
      /* The FlatList component requires two props: data and renderItem. data is the source of information for the list.
      renderItem takes one item from the source and returns a formatted component to render. */

      <FlatList
        data={dishes}
        // Rendering our items in our flatlist.
        renderItem={renderMenuItem}
        // When we render a list of items we need to grab the key of each item
        // THe key extractor will extract one of the props from the item in the array and use as key
        // we are using the ID as a key for the items in the list.
        // Our id is a number so we turn it into a string because the keyextractor expects a string.
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default Menu;
