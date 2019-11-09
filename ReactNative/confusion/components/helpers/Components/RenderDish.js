import React from 'react';
import { Text, View, Share } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../../shared/baseurl';

const styles = {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flex: 1,
  margin: 10,
};

export default function RenderDish(props) {
  const { dish } = props;

  const shareDish = (title, message, url) => {
    Share.share(
      {
        title,
        message: `${title}: ${message} ${url}`,
        url,
      },
      {
        dialogTitle: `Share ${title}`,
      }
    );
  };

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>

        <View style={styles}>
          <Icon
            raised
            reverse
            name={props.favorite ? 'heart' : 'heart-o'}
            type="font-awesome"
            color="#f50"
            onPress={() => props.toggleFavorite()}
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="purple"
            onPress={() => props.toggleModal(true)}
          />
          <Icon
            raised
            reverse
            name="share"
            type="font-awesome"
            color="#51D2A8"
            style={styles.cardItem}
            onPress={() =>
              shareDish(dish.name, dish.description, baseUrl + dish.image)
            }
          />
        </View>
      </Card>
    );
  }

  return <View></View>;
}

RenderDish.propTypes = {
  dish: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.object.isRequired,
  toggleModal: PropTypes.object.isRequired,
};
