/* eslint-disable no-undef */
import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import PropTypes from 'prop-types';

/* import { Container, Row, Col } from 'reactstrap'; */
import * as Animatable from 'react-native-animatable';

const formatter = new Intl.DateTimeFormat('en-GB');

export default function RenderComments({ comments }) {
  const renderStars = count =>
    [...Array(count)].map((_, i) => (
      <Icon
        raised
        key={i}
        name="star"
        type="font-awesome"
        color="#f50"
        size="5"
        onPress={() => console.log('hello')}
      />
    ));

  console.log('WE ARE RENDERING COMMENTS');
  const renderCommentItem = ({ item, key }) => (
    <View key={key} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <View style={{ margin: 10, flex: 1, flexDirection: 'row' }}>
        {renderStars(item.rating)}
      </View>
      <Text style={{ fontSize: 12 }}>
        {`-- ${item.author}, ${formatter.format(Date.parse(item.date))}`}
      </Text>
    </View>
  );

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

RenderComments.propTypes = {
  // // WTF?
  comments: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  key: PropTypes.object.isRequired,
};
