import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {
	// Setting the const dish as our passed down props.

	const dish = props.dish;

	//Conditional rendering.
	if (dish != null) {
		console.log("We are here");
		return (
			<Card
				featuredTitle={dish.name}
				image={require('./images/uthappizza.png')}>
				<Text style={{ margin: 10 }}>
					{dish.description}
				</Text>
			</Card>
		);
	}
	else {
		return (<View></View>)
	}
}

class DishDetail extends Component {


	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES // shared object we are importing.
		};
	}


	static navigationOptions = {
		title: 'Dish Details'
	}

	render(){
	// showing which dish to show based on the ID passed in from menucomponent
	// This.props.navigation are passed in to all components in my navigator,
    // We have access here to the getParam(), which allows us to access the parameters that are passed in.

	// Passing props to our function and returning it as the view for our component here..
		//this.state.dishes is a javascript object array so we have to specifically select the dish we want.
		// The plus here means that since this will be a string that is passed in i am going to turn that into a number.

		const dishId = this.props.navigation.getParam('dishId','');

		return (
		<RenderDish dish={this.state.dishes[+dishId]} />
		)
	}
}

export default DishDetail