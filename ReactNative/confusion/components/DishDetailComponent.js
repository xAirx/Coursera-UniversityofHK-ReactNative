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
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';
import { Loading } from './LoadingComponent';
import {
  fetchDishes,
  fetchComments,
  removeFavorite,
  addFavorite,
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
};

function RenderDish(props) {
  const { dish } = props;
  const { showModal } = props;
  if (dish != null) {
    console.log('We are here');
    return (
      <Card
        featuredTitle={dish.name}
        // eslint-disable-next-line global-require
        image={{ uri: baseUrl + dish.image }}
      >
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onDismiss={() => props.dismissModal(false)}
            onRequestClose={() => props.dismissModal(false)}
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
                />

                <Input
                  placeholder="Comment"
                  leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  style={styles}
                />

                <Button
                  onPress={() => {
                    props.dismissModal(false);
                  }}
                  color="purple"
                  title="SUBMIT"
                />
                <Button
                  onPress={() => {
                    props.dismissModal(false);
                  }}
                  color="#512DA8"
                  title="Cancel"
                />
              </View>
            </SafeAreaView>
          </Modal>
        </View>
      </Card>
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
    this.state = {
      showModal: false,
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

  static navigationOptions = {
    title: 'Dish Details',
  };

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');

    /* console.log(`THIS IS THE DISHID${dishId}`); */

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
          toggleModal={this.toggleModal}
          dismissModal={this.dismissModal}
          showModal={this.state.showModal}
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
  dishes: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
