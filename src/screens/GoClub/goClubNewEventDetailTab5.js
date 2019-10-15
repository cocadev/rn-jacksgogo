import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';

export default class GoClubNewEventDetailTab5 extends React.Component {

  render() {
    return (
      <ScrollView style={{  flex:1 }}>
        
        <Text style={[texts.LISTTITLE, {marginTop:14}]}>Is this a paid event?</Text>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Free event. No payment needed.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Paid event.</Text>
        </TouchableOpacity>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  photoButton: {
    flexDirection:'row',
    height: 42,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 20,
    paddingLeft: 10,
    alignItems:'center'
  },
});

