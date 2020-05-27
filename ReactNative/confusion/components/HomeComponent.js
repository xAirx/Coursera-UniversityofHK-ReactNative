/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { fetchDishes, fetchPromos, fetchLeaders } from '../Redux/Api/ActionCreators';
/* import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders'; */
import RenderItem from './helpers/Components/RenderItem';

const mapStateToProps = state => ({
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
});

const mapDispatchToProps = dispatch => ({
        fetchDishes: dispatch(fetchDishes()),
        fetchPromos: dispatch(fetchPromos()),
        fetchLeaders: dispatch(fetchLeaders()),
});

// IF we pass a prop that it cannot handle.
// Will give an error.

RenderItem.propTypes = {
        item: PropTypes.object,
};

class Home extends Component {
        // Local Navigation options ...

        static navigationOptions = {
                title: 'Menu',
        };

        render() {
                console.log(`THIS IS PROPS FOR NAVIGATION: ${JSON.stringify(this.props.navigation)}`);
                const { promotions } = this.props.promotions;
                const { dishes } = this.props.dishes;
                const { leaders } = this.props.leaders;

                return (
                        <ScrollView>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                        <Animatable.View animation="fadeInDown" duration={500} delay={200}>
                                                <RenderItem
                                                        item={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                                                        isLoading={this.props.dishes.isLoading}
                                                        erreMess={this.props.dishes.erreMess}
                                                />
                                        </Animatable.View>
                                        <Animatable.View animation="fadeInDown" duration={500} delay={200}>
                                                <RenderItem
                                                        item={
                                                                this.props.promotions.promotions.filter(
                                                                        promo => promo.featured
                                                                )[0]
                                                        }
                                                        isLoading={this.props.promotions.isLoading}
                                                        erreMess={this.props.promotions.erreMess}
                                                />
                                        </Animatable.View>
                                        <Animatable.View animation="fadeInDown" duration={500} delay={200}>
                                                <RenderItem
                                                        item={
                                                                this.props.leaders.leaders.filter(
                                                                        leader => leader.featured
                                                                )[0]
                                                        }
                                                        isLoading={this.props.leaders.isLoading}
                                                        erreMess={this.props.leaders.erreMess}
                                                />
                                        </Animatable.View>
                                </View>
                        </ScrollView>
                );
        }
}

Home.propTypes = {
        // // WTF?
        /*   item: PropTypes.array.isRequired, */
        promotions: PropTypes.object.isRequired,
        dishes: PropTypes.object.isRequired,
        leaders: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
