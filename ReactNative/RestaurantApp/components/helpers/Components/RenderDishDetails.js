/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Text, View, ScrollView, Modal, SafeAreaView, Button } from 'react-native';

import { Rating, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeOut from 'react-native-swipeout';
import { Loading } from './LoadingComponent';
import {
  fetchDishes,
  fetchComments,
  removeFavorite,
  addFavorite,
  postComments,
} from '../../../Redux/Api/ActionCreators';

import RenderDish from './RenderDish';
import RenderDishComments from './RenderDishComments';

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

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.state = {
      showModal: false,
      rating: '',
      author: '',
      comment: '',
      /* dishId: '', */
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

  addFavorite(dishId) {
    this.props.addFavorite(dishId);
  }

  removeFavorite(dishId) {
    this.props.removeFavorite(dishId);
  }

  ratingCompleted(rating) {
    /* console.log(`Rating is: ${rating}`); */
    // eslint-disable-next-line object-shorthand
    this.setState({ rating });
  }

  handleSubmit(dishId) {
    // eslint-disable-next-line object-shorthand
    /*  console.log('THIS IS THE STATE', dishId); */
    // eslint-disable-next-line object-shorthand
    this.props.postComments(dishId, this.state.rating, this.state.author, this.state.comment, this.state.date);
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  render() {
    /* console.log('THIS ARE THISPROPS ', this.props); */
    const dishId = this.props.navigation.getParam('dishId', '');

    /*  console.log(`THIS IS THE DISHID${dishId}`); */

    // ////////////////////////// Swipe //////////////////////
    const rightButton = [
      {
        /* component: IconFavorite, */
        /* text: 'Add as Favorite', */
        text: 'Comment',
        type: 'add',
        scroll: 'no',
        autoClose: 'yes',
        onPress: () => {
          /* console.log('WE ARE DELETING SWIPE'), this.addFavorite(dishId); */
          this.toggleModal(dishId);
        },
      },
    ];

    const leftButton = [
      {
        /* component: IconDelFavorite, */
        /*  text: 'Delete Favorite', */
        text: 'Comment',
        type: 'Comment',
        /*  type: 'delete', */
        scroll: 'no',
        autoClose: 'yes',
        onPress: () => {
          /*  console.log('WE ARE DELETING SWIPE'), this.removeFavorite(dishId); */
          this.toggleModal(dishId);
        },
      },
    ];
    // /////////////////////////////////////////////////

    if (this.props.dishes.isLoading) {
      return <Loading />;
    }
    if (this.props.dishes.errMess) {
      return <Text>{this.props.dishes.errMess}</Text>;
    }
    return (
      <ScrollView>
        <SwipeOut left={leftButton} right={rightButton} buttonWidth={150} autoClose>
          <RenderDish
            dish={this.props.dishes.dishes[dishId]}
            // find dish id in favorite to make sure we can show icon
            favorite={this.props.favorites.some(el => el === dishId)}
            toggleFavorite={() => this.toggleFavorite(dishId)}
            toggleModal={() => this.toggleModal(dishId)}
          />
        </SwipeOut>
        <RenderDishComments comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.dismissModal(false)}
          onRequestClose={() => this.dismissModal(false)}
        >
          <SafeAreaView>
            <View style={styles.modal}>
              <Rating type="star" ratingCount={5} imageSize={60} showRating onFinishRating={this.ratingCompleted} />
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
                  /* console.log('THIS IS DISHID IN BUTTON', dishId); */
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
  removeFavorite: PropTypes.object.isRequired,
  addFavorite: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  postComments: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
