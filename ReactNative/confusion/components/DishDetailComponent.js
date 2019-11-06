/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon, Rating, Input } from 'react-native-elements';
/* import { Container, Row, Col } from 'reactstrap'; */
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseurl';
import { Loading } from './LoadingComponent';
import {
  fetchDishes,
  fetchComments,
  removeFavorite,
  addFavorite,
  postComments,
} from '../Redux/Api/ActionCreators';

const styles = {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flex: 1,
  margin: 10,
};

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
  postComments: (dishId, rating, author, comment) => {
    dispatch(postComments(dishId, rating, author, comment));
  },
});

const formatter = new Intl.DateTimeFormat('en-GB');

function RenderComments(props) {
  const { comments } = props;
  console.log('PROPS IN RENDERCOMMENTS ', props);
  console.log('WE ARE RENDERING COMMENTS');
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
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

RenderComments.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  comments: PropTypes.array.isRequired,
};

function RenderDish(props) {
  const { dish } = props;
  if (dish != null) {
    console.log('We are here');
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>

          <View style={styles}>
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type="font-awesome"
              color="#f50"
              onPress={() => props.toggleFavorite()}
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="purple"
              onPress={() => props.toggleModal(true)}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }

  return <View></View>;
}

RenderDish.propTypes = {
  dish: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
};

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.state = {
      showModal: false,
      rating: '',
      author: '',
      comment: '',
      dishId: '',
    };
  }

  toggleModal() {
    this.setState({ showModal: true });
  }

  dismissModal() {
    this.setState({ showModal: false });
  }

  toggleFavorite(dishId) {
    if (this.props.favorites.some(el => el === dishId)) {
      /*  console.log('REMOVIONG FAVORITE'); */
      this.props.removeFavorite(dishId);
    } else {
      /* console.log('ADDING FAVORITE'); */
      this.props.addFavorite(dishId);
    }
  }

  ratingCompleted(rating) {
    console.log(`Rating is: ${rating}`);
    // eslint-disable-next-line object-shorthand
    this.setState({ rating });
  }

  handleSubmit(dishId) {
    // eslint-disable-next-line object-shorthand
    console.log('THIS IS THE STATE', dishId);
    // eslint-disable-next-line object-shorthand
    this.props.postComments(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment,
      this.state.date
    );
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  render() {
    console.log('THIS ARE THISPROPS ', this.props);
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
          toggleModal={() => this.toggleModal(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.dismissModal(false)}
          onRequestClose={() => this.dismissModal(false)}
        >
          <SafeAreaView>
            <View style={styles.modal}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={60}
                showRating
                onFinishRating={this.ratingCompleted}
              />
              <Input
                placeholder="Author"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                style={styles}
                onChangeText={value => this.setState({ author: value })}
              />

              <Input
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                style={styles}
                onChangeText={value => this.setState({ comment: value })}
              />

              <Button
                onPress={() => {
                  this.handleSubmit(dishId);
                  console.log('THIS IS DISHID IN BUTTON', dishId);
                  this.dismissModal(false);
                }}
                color="purple"
                title="SUBMIT"
              />
              <Button
                onPress={() => {
                  this.dismissModal(true);
                }}
                color="#512DA8"
                title="Cancel"
              />
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    );
  }
}

DishDetail.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  dishes: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
