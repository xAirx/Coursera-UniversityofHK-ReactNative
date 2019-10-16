import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

// We will  make a class component here because we need to move the state into all of our components to get it ready with redux.

class Menu extends Component {
	/* function Menu(props) { */
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES
		}
	}


	//Local Navigation options ...
	static navigationOptions = {
		title: 'Menu'
	}

	render() {



		// Grabbing our ListITEMS

		/* 		renderItem
		renderItem({item, index, separators});
		Takes an item from data and renders it into the list.
		Provides additional metadata like index if you need it */

		/*
		It takes item and then the index as the two parameters
		The "Item" is what will give me access to each item in the array (this.props.dishes)
		When you supply data  to the flatlist below data which is an array each item is mapped as "item"
		Each element in the array will become an item that is supplied to the function getting the "mapped"
		data in this case the flatlist. */



		const renderMenuItem = ({ item, index }) => {
			// We set the ITEM and Key here we want to loop over.
			return (

			<ListItem
				// Setting unique key and is what is supplied to our keyextractor in flatlist
				key={index}
				// grabbing data from props. The looped value is named item.
				title={item.name}
				subtitle={item.description}
				// Hiding list elements like list unstyled in bootstrap
				hideChevron={true}
				// added onPress to our listItem, this function is passed down from main component as a method
				// This will make sure to navigate to this component on press and pass ID.
				onPress={() => navigate('DishDetail', { dishId: item.id })}
				// Setting a picture.
				leftAvatar={{ source: require('./images/uthappizza.png') }}
			/>
			);
	    }

		// our props for this component will conatain one propery named navigation, we are extracting it here.
		// When we press an item in the menucomponent  we will pass this information to dishdetailcomponent with the navigator
		const { navigate } = this.props.navigation;

			return (
				// Will iterate over each item in the array, in the view given from rendermenuitem.
				/* The FlatList component requires two props: data and renderItem. data is the source of information for the list.
				renderItem takes one item from the source and returns a formatted component to render. */

				<FlatList
					data={this.state.dishes}
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