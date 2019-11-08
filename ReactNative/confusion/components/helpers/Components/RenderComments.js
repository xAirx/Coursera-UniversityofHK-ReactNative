import React from 'react';
import { Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from 'react-native-elements';
/* import { Container, Row, Col } from 'reactstrap'; */
import * as Animatable from 'react-native-animatable';

const formatter = new Intl.DateTimeFormat('en-GB');

export default function RenderComments(props) {
  const { comments } = props;
  console.log('PROPS IN RENDERCOMMENTS ', props);
  console.log('WE ARE RENDERING COMMENTS');
  const renderCommentItem = ({ item, key }) => (
    <View key={key} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
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
  /*   item: PropTypes.array.isRequired, */
  comments: PropTypes.array.isRequired,
};
