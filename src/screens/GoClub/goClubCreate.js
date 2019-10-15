import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import AllCategoriesGrid from '../../components/AllCategoriesGrid';

export default class GoClubCreate extends React.Component {
  render() {
    return (
      <View style={[commonStyles.container]}>
        <Header title="Create New GoClub"/>
        <Text style={[texts.LISTTEXT, {marginTop:12, marginLeft:12}]}>Choose a category for your GoClub:</Text>
        <AllCategoriesGrid type='goclubcreatedetail'/>
      </View>
    );
  }
}
