/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';
import { Loading } from './LoadingComponent';
import {
  fetchDishes,
  fetchComments,
  removeFavorite,
  addFavorite,
} from '../Redux/Api/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  fetchDishes: dispatch(fetchDishes()),
  fetchComments: dispatch(fetchComments()),
  addFavorite: dishId => dispatch(addFavorite(dishId)),
  removeFavorite: dishId => dispatch(removeFavorite(dishId)),
});

const formatter = new Intl.DateTimeFormat('en-GB');

function RenderComments(props) {
  const { comments } = props;

  const renderCommentItem = ({ item, key }) => (
    <View key={key} style={{ margin: 10 }}>
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

RenderComments.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  comments: PropTypes.array.isRequired,
  key: PropTypes.number.isRequired,
  item: PropTypes.array.isRequired,
};

function RenderDish(props) {
  const { dish } = props;
  if (dish != null) {
    console.log('We are here');
    return (
      <Card
        featuredTitle={dish.name}
        // eslint-disable-next-line global-require
        image={{ uri: baseUrl + dish.image }}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? 'heart' : 'heart-o'}
          type="font-awesome"
          color="#f50"
          onPress={() => props.toggleFavorite()}
        />
      </Card>
    );
  }

  return <View></View>;
}

RenderDish.propTypes = {
  dish: PropTypes.array.isRequired,
  favorite: PropTypes.array.isRequired,
  onPress: PropTypes.array.isRequired,
};

class DishDetail extends Component {
  toggleFavorite(dishId) {
    if (this.props.favorites.some(el => el === dishId)) {
      console.log('REMOVIONG FAVORITE');
      this.props.removeFavorite(dishId);
    } else {
      console.log('ADDING FAVORITE');
      this.props.addFavorite(dishId);
    }
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');

    console.log(`THIS IS THE DISHID${dishId}`);

    if (this.props.dishes.isLoading) {
      return <Loading />;
    }
    if (this.props.dishes.errMess) {
      return <Text>{this.props.dishes.errMess}</Text>;
    }
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[dishId]}
          // find dish id in favorite to make sure we can show icon
          favorite={this.props.favorites.some(el => el === dishId)}
          toggleFavorite={() => this.toggleFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

DishDetail.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  dishes: PropTypes.array.isRequired,
  navigation: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  postFavorite: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
