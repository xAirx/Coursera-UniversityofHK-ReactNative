import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Menu(props) {

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
			// grabbing data frmo our props.
			// The props are passed to menu from MainComponent.js
			//
			<ListItem
				// Setting unique key and is what is supplied to our keyextractor in flatlist
				key={index}
				// grabbing data from props. The looped value is named item.
				title={item.name}
				subtitle={item.description}
				// Hiding list elements like list unstyled in bootstrap
				hideChevron={true}
				// Setting a picture.
				leftAvatar={{ source: require('./images/uthappizza.png') }}
			/>
		);
	};

	return (

		// Will iterate over each item in the array, in the view given from rendermenuitem.
		/* The FlatList component requires two props: data and renderItem. data is the source of information for the list.
		renderItem takes one item from the source and returns a formatted component to render. */

		<FlatList
			data={props.dishes}
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


export default Menu;