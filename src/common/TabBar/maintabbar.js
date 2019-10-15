import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { SimpleLineIcons, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { colors } from '../colors'

class MainTabBar extends Component {
  render() {
    const { navigate, state } = this.props.navigation;
    const { index, routes } = state;
    const active = routes[index].key;
    return (
      <View style={styles.container}>

        <TouchableWithoutFeedback onPress={() => navigate('Tab1')}>
          <View style={active === 'Tab1' ? styles.active : styles.nonactive}>
            <Ionicons name="md-search" size={32} color={active === 'Tab1' ? colors.ORANGE : colors.GREY1} />
            <Text style={active === 'Tab1' ? {color:colors.ORANGE} : {color:colors.GREY1}}>Search</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Tab2')}>

          <View style={active === 'Tab2' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="home-outline" size={30} color={active === 'Tab2' ? colors.ORANGE : colors.GREY1} />
            <Text style={active === 'Tab2' ? {color:colors.ORANGE} : {color:colors.GREY1}}>GoClubs</Text>
          </View>
            
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={styles.active}>
            
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Tab3')}>
          <View style={active === 'Tab3' ? styles.active : styles.nonactive}>
            <MaterialCommunityIcons name="briefcase-outline" size={29} color={active === 'Tab3' ? colors.ORANGE : colors.GREY1}/>
            <Text style={active === 'Tab3' ? {color:colors.ORANGE} : {color:colors.GREY1}}>Briefcase</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigate('Tab4')}>
          <View style={active === 'Tab4' ? styles.active : styles.nonactive}>
            <SimpleLineIcons name="user" size={25} color={active === 'Tab4' ? colors.ORANGE : colors.GREY1}/>
            <Text style={active === 'Tab4' ? {color:colors.ORANGE} : {color:colors.GREY1}}>Profile</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

MainTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MainTabBar;
