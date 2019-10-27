import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props) {
  const { item } = props;

  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        // eslint-disable-next-line global-require
        image={require('./images/uthappizza.png')}
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
  item: PropTypes.object.isRequired,
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  // Local Navigation options ...
  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    const { dishes, promotions, leaders } = this.state;

    return (
      <ScrollView>
        {/*         ////////////// Noget mere CHECK PÅ OM DER RENT FAKTISK ER DATA
         */}
        <RenderItem item={dishes.filter(dish => dish.featured)[0]} />
        <RenderItem item={promotions.filter(promo => promo.featured)[0]} />
        <RenderItem item={leaders.filter(leader => leader.featured)[0]} />
      </ScrollView>
    );
  }
}
export default Home;
