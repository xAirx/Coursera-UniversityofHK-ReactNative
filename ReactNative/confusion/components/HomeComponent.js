/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
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
  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    console.log(`THIS IS PROPS FOR NAVIGATION: ${  this.props.navigtion}`);
    const { promotions } = this.props.promotions;
    const { dishes } = this.props.dishes;
    const { leaders } = this.props.leaders;

    return (
      <ScrollView>
        {/* ////////////// Noget mere CHECK PÅ OM DER RENT FAKTISK ER DATA////////////// ////////////// ////////////// //////////////
         */}
        <RenderItem
          item={dishes.filter(dish => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          /*           onPress={() => this.props.navigation.toggleDrawer()}
           */
        />
        <RenderItem
          item={promotions.filter(promo => promo.featured)[0]}
          errMess={this.props.promotions.errMess}
          isLoading={this.props.promotions.isLoading}
          /*           onPress={() => this.props.navigation.toggleDrawer()}
           */
        />
        <RenderItem
          item={leaders.filter(leader => leader.featured)[0]}
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess}
          /*           onPress={() => this.props.navigation.toggleDrawer()}
           */
        />
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
