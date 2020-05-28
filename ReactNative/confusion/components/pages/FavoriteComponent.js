import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import SwipeOut from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseurl';
import { deleteFavorite } from '../Redux/Api/ActionCreators';

const mapDispatchToProps = dispatch => ({
  deleteFavorite: dishId => dispatch(deleteFavorite(dishId)),
});

const mapStateToProps = state => ({
  dishes: state.dishes,
  favorites: state.favorites,
});

class Favorites extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Delete Favorite?',
              `Are you sure you wish to delete the favorite dish ${item.name}?`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log(`${item.name}Not Deleted`),
                  style: ' cancel',
                },
                {
                  text: 'OK',
                  onPress: () => this.props.deleteFavorite(item.id),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ];
      return (
        <SwipeOut right={rightButton} autoClose>
          <Animatable.View animation="fadeInDown" duration={500} delay={200}>
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.description}
              hideChevron
              onPress={() => navigate('Dishdetail', { dishId: item.id })}
              leftAvatar={{ source: { uri: baseUrl + item.image } }}
            />
          </Animatable.View>
        </SwipeOut>
      );
    };

    if (this.props.dishes.isLoading) {
      return <Loading />;
    }
    if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
