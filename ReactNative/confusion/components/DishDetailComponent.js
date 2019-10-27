import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

const formatter = new Intl.DateTimeFormat('en-GB');

function RenderComments(props) {
  const { comments } = props;

  const renderCommentItem = ({ item, index }) => (
    <View key={index} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
      <Text style={{ fontSize: 12 }}>
        {`-- ${item.author}, ${formatter.format(Date.parse(item.date))}`}
      </Text>
    </View>
  );

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

/* RenderComments.propTypes = {
  // // WTF?
  item: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  index: PropTypes.array.isRequired,
}; */

function RenderDish(props) {
  // Setting the const dish as our passed down props.

  /*  const { dish } = props; */

  // Conditional rendering.
  if (props != null) {
    console.log(
      ` THESE ARE THE PROPS INSIDE DISHDETAILCOMPONENT ${JSON.stringify(props)}`
    );
    console.log('We are here');
    return (
      <Card
        featuredTitle={props.dish.name}
        // eslint-disable-next-line global-require
        image={require('./images/uthappizza.png')}
      >
        <Text style={{ margin: 10 }}>{props.dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? 'heart' : 'heart-o'}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log('Already favorite') : props.onPress()
          }
        />
      </Card>
    );
  }

  return <View></View>;
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: [],
    };
  }

  markFavorite(dishId) {
    const { favorites } = this.state;
    this.setState({ favorites: favorites.concat(dishId) });
    console.log('Setting Favorites');
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  render() {
    const { dishes, comments, favorites } = this.state;
    // showing which dish to show based on the ID passed in from menucomponent
    // This.props.navigation are passed in to all components in my navigator,
    // We have access here to the getParam(), which allows us to access the parameters that are passed in.

    // Passing props to our function and returning it as the view for our component here..
    // this.state.dishes is a javascript object array so we have to specifically select the dish we want.
    // The plus here means that since this will be a string that is passed in i am going to turn that into a number.

    // eslint-disable-next-line react/destructuring-assignment
    const dishId = this.props.navigation.getParam('dishId', '');

    return (
      <ScrollView>
        <RenderDish
          dish={dishes[+dishId]}
          favorite={favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={comments.filter(comment => comment.dishId === dishId)}
        />
      </ScrollView>
    );
  }
}

DishDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DishDetail;
