import React from 'react';
import * as Animatable from 'react-native-animatable';
import { View, FlatList, Text } from 'react-native';
import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseurl';
import { Loading } from './LoadingComponent';
import History from './helpers/Components/History';
import { baseUrl } from '../../../shared/baseurl';
import { Loading } from './LoadingComponent';

export default function RenderAboutItems(props) {
  const { leaders } = props;
  console.log('PROPS WITHIN RENDERABOUTITEM', leaders);

  const RenderAboutItem = ({ item, key }) => (
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

  if (leaders.isLoading) {
    return (
      <ScrollView>
        <History />
        <Card title="Corporate Leadership">
          <Loading />
        </Card>
      </ScrollView>
    );
  }
  if (leaders.errMess) {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={500} delay={200}>
          <History />
          <Card title="Corporate Leadership">
            <Text>{leaders.errMess}</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Animatable.View animation="fadeInDown" duration={500} delay={200}>
        <History />
        <Card title="Corporate Leadership">
          <FlatList
            data={this.props.leaders.leaders}
            renderItem={RenderAboutItem}
            keyExtractor={item => item.id /* .toString() */}
          />
        </Card>
      </Animatable.View>
    </ScrollView>
  );

}

RenderAboutItem.propTypes = {
    leaders: PropTypes.object.isRequired,
  };