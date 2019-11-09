/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text } from 'react-native';
import { Car, Tile } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../../../shared/baseurl';
import { Loading } from '../../LoadingComponent';

export default function RenderItem(props) {
  const { item } = props;
  const { navigation } = props;
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
      <Animatable.View animation="fadeInDown" duration={500} delay={200}>
        <Tile
          height={280}
          title={item.name}
          caption={item.description}
          featured
          // eslint-disable-next-line global-require
          imageSrc={{ uri: baseUrl + item.image }}
        />
      </Animatable.View>
    );
  }

  return <View></View>;
}

RenderItem.propTypes = {
  item: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errMess: PropTypes.object.isRequired,
};
