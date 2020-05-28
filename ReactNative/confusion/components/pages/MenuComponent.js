import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
/* import { DISHES } from '../shared/dishes'; */
// We will  make a class component here because we need to move the state into all of our components to get it ready with redux.
import RenderMenuItem from '../helpers/Components/RenderMenuItem';

const mapStateToProps = state => ({
  dishes: state.dishes,
});

class Menu extends Component {
  // Local Navigation options ...
  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    const { dishes } = this.props;
    const { navigation } = this.props;
    console.log('navigationfromparent', navigation);

    return <RenderMenuItem dishes={dishes} navigation={navigation} />;
  }
}

Menu.propTypes = {
  /*   item: PropTypes.array.isRequired, */
  dishes: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Menu);
