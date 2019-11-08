import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Tile } from 'react-native-elements';
import { View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';

import { baseUrl } from '../../../shared/baseurl';
import { Loading } from '../../LoadingComponent';

export default function RenderMenuItems(props) {
  const { dishes } = props;
  const { navigation } = props;
  console.log('navigationfromchild', navigation);

  // We set the ITEM and Key here we want to loop over.
  const renderMenuItem = ({ item, index }) => (
    // We set the ITEM and Key here we want to loop over.
    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        featured
        onPress={() => {
          /*           console.log(navigation) ||
           */ navigation.navigate('DishDetail', { dishId: item.id });
        }}
        // eslint-disable-next-line global-require
        imageSrc={{ uri: baseUrl + item.image }}
      />
    </Animatable.View>
  );

  // our props for this component will conatain one propery named navigation, we are extracting it here.
  // When we press an item in the menucomponent  we will pass this information to dishdetailcomponent with the navigator
  if (dishes.isLoading) {
    return <Loading />;
  }

  if (dishes.errMess) {
    return (
      <View>
        <Text>{dishes.errMess}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={dishes.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}

RenderMenuItems.propTypes = {
  /*   item: PropTypes.array.isRequired, */
  dishes: PropTypes.object.isRequired,
};

/* export default function RenderComments(props) {
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
 */
