/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';

import {
  fetchDishes,
  fetchPromos,
  fetchLeaders,
} from '../Redux/Api/ActionCreators';
import { Loading } from './LoadingComponent';
/* import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders'; */

const mapStateToProps = state => ({
  dishes: state.dishes,
  promotions: state.promotions,
  leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
  fetchDishes: dispatch(fetchDishes()),
  fetchPromos: dispatch(fetchPromos()),
  fetchLeaders: dispatch(fetchLeaders()),
});

function RenderItem(props) {
  const { item } = props;

  if (props.isLoading) {
    return <Loading />;
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  /* if (props.) */
  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: baseUrl + item.image }}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }

  return <View></View>;
}

// IF we pass a prop that it cannot handle.
// Will give an error.

RenderItem.propTypes = {
  item: PropTypes.object,
};

class Home extends Component {
  // Local Navigation options ...

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  static navigationOptions = {
    title: 'Menu',
  };

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear,
    }).start(() => this.animate());
  }

  render() {
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });

    console.log(
      `THIS IS PROPS FOR NAVIGATION: ${JSON.stringify(this.props.navigation)}`
    );
    const { promotions } = this.props.promotions;
    const { dishes } = this.props.dishes;
    const { leaders } = this.props.leaders;

    return (
      <ScrollView>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
          <Animated.View
            style={{ width: '100%', transform: [{ translateX: xpos1 }] }}
          >
            <RenderItem
              item={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
              isLoading={this.props.dishes.isLoading}
              erreMess={this.props.dishes.erreMess}
            />
          </Animated.View>
          <Animated.View
            style={{ width: '100%', transform: [{ translateX: xpos2 }] }}
          >
            <RenderItem
              item={
                this.props.promotions.promotions.filter(
                  promo => promo.featured
                )[0]
              }
              isLoading={this.props.promotions.isLoading}
              erreMess={this.props.promotions.erreMess}
            />
          </Animated.View>
          <Animated.View
            style={{ width: '100%', transform: [{ translateX: xpos3 }] }}
          >
            <RenderItem
              item={
                this.props.leaders.leaders.filter(leader => leader.featured)[0]
              }
              isLoading={this.props.leaders.isLoading}
              erreMess={this.props.leaders.erreMess}
            />
          </Animated.View>
        </View>
      </ScrollView>
    );
  }
}

Home.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  promotions: PropTypes.object.isRequired,
  dishes: PropTypes.object.isRequired,
  leaders: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
