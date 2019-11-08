/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../../../shared/baseurl';
import { Loading } from '../../LoadingComponent';

export default function RenderItem(props) {
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
