import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseurl';
import { fetchLeaders } from '../Redux/Api/ActionCreators';
import { Loading } from './LoadingComponent';
import History from './helpers/Components/History';
import RenderAboutItem from '../helpers/Components/RenderAboutItem';

const mapStateToProps = state => ({
  leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
  fetchLeaders: dispatch(fetchLeaders()),
});

class About extends Component {
  // Local Navigation options ...
  static navigationOptions = {
    title: 'About',
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment

    const { leaders } = this.props;

    return <RenderAboutItem leaders={leaders} />;
  }
}

About.propTypes = {
  leaders: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
