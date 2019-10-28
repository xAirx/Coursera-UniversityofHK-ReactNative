import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';
/* import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders'; */

import {
  fetchDishes,
  fetchPromos,
  fetchLeaders,
} from '../Redux/Api/ActionCreators';

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

  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        // eslint-disable-next-line global-require
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
    const { promotions } = this.props.promotions;
    const { dishes } = this.props.dishes;
    const { leaders } = this.props.leaders;

    return (
      <ScrollView>
        {/* ////////////// Noget mere CHECK PÅ OM DER RENT FAKTISK ER DATA////////////// ////////////// ////////////// //////////////
         */}
        <RenderItem item={dishes.filter(dish => dish.featured)[0]} />
        <RenderItem
          item={promotions.filter(promotion => promotion.featured)[0]}
        />
        <RenderItem item={leaders.filter(leader => leader.featured)[0]} />
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
