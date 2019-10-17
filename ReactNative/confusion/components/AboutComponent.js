import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Card } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';


function History() {
	return (
		<>
			<Card title="Our History">
			<Text style={{margin: 10}}>

				Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong.
				 With its unique brand of world fusion cuisine that can be found nowhere else,
				 it enjoys patronage from the A-list clientele in Hong Kong.
				  Featuring four of the best three-star Michelin chefs in the world,
				  you never know what will arrive on your plate the next time you visit us.

				The restaurant traces its humble beginnings to The Frying Pan,
				a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.

			</Text>
			</Card>

		</>
	)
}


class About extends Component {

	/* function Menu(props) { */
		constructor(props) {
			super(props);
			this.state = {
				leaders: LEADERS
			}
		}


		//Local Navigation options ...
		static navigationOptions = {
			title: 'About'
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
					// Setting a picture.
					leftAvatar={{ source: require('./images/alberto.png') }}
				/>
				);
			}

			// our props for this component will conatain one propery named navigation, we are extracting it here.
			// When we press an item in the menucomponent  we will pass this information to dishdetailcomponent with the navigator

			// Will iterate over each item in the array, in the view given from rendermenuitem.
					/* The FlatList component requires two props: data and renderItem. data is the source of information for the list.
					renderItem takes one item from the source and returns a formatted component to render. */

				return (
					<>

					<History />
					<ScrollView>
					<Card title='Corporate Leadership'>
					<FlatList
						data={this.state.leaders}
						// Rendering our items in our flatlist.
						renderItem={renderMenuItem}
						// When we render a list of items we need to grab the key of each item
						// THe key extractor will extract one of the props from the item in the array and use as key
						// we are using the ID as a key for the items in the list.
						// Our id is a number so we turn it into a string because the keyextractor expects a string.
 						keyExtractor={item => item.id.toString()}
 					/>
					</Card>
					</ScrollView>
					</>
				);
			}
}

export default About