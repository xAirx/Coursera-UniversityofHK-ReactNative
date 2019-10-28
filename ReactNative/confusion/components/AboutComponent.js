import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { baseUrl } from '../shared/baseurl';
import { fetchLeaders } from '../Redux/Api/ActionCreators';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => ({
  leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
  fetchLeaders: dispatch(fetchLeaders()),
});

function History() {
  return (
    <>
      <Card title="Our History">
        <Text style={{ margin: 10 }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong.
          {'\n'}
          {'\n'}With its unique brand of world fusion cuisine that can be found
          nowhere else,it enjoys patronage from the A-list clientele in Hong
          Kong.
          {'\n'}
          {'\n'}Featuring four of the best three-star Michelin chefs in the
          world, you never know what will arrive on your plate the next time you
          visit us.
          {'\n'}
          {'\n'}
          {'\n'}
          The restaurant traces its humble beginnings to The Frying Pan, a
          successful chain started by our CEO, Mr. Peter Pan, that featured for
          the first time the world's best cuisines in a pan.
        </Text>
      </Card>
    </>
  );
}

class About extends Component {
  // Local Navigation options ...
  static navigationOptions = {
    title: 'About',
  };

  render() {
    /* const { leaders } = this.props.leaders; */

    const renderMenuItem = ({ item, key }) => (
      // We set the ITEM and Key here we want to loop over.
      <ListItem
        titleStyle={{ fontWeight: 'bold' }}
        // Setting unique key and is what is supplied to our keyextractor in flatlist
        key={key}
        // grabbing data from props. The looped value is named item.
        title={item.name}
        subtitle={item.description}
        // Hiding list elements like list unstyled in bootstrap
        hideChevron
        // added onPress to our listItem, this function is passed down from main component as a method
        // This will make sure to navigate to this component on press and pass ID.
        // Setting a picture.
        leftAvatar={{ source: { uri: baseUrl + item.image } }}
      />
    );

    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <History />
          <Card title="Corporate Leadership">
            <Loading />
          </Card>
        </ScrollView>
      );
    }
    if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <History />
          <Card title="Corporate Leadership">
            <Text>{this.props.leaders.errMess}</Text>
          </Card>
        </ScrollView>
      );
    }

    return (
      <ScrollView>
        <History />
        <Card title="Corporate Leadership">
          <FlatList
            data={this.props.leaders.leaders}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

About.propTypes = {
  // // WTF?
  /*   item: PropTypes.array.isRequired, */
  leaders: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
