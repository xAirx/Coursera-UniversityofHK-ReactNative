import React from 'react';
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'

// props passed from below.
function RenderDish(props) {


	// Setting the const dish as our passed down props.

	const dish = props.dish;

	if (dish != null) {
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

function DishDetail(props) {
	// Passing props to our function and returning it as the view for our component here..
	return (<RenderDish dish={props.dish} />)
}

export default DishDetail