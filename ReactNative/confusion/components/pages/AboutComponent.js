import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLeaders } from '../../Redux/Api/ActionCreators';
import RenderAboutItem from '../helpers/Components/RenderAboutItem.js';

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
