import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';

export default class GoClubNewEventDetailTab3 extends React.Component {

  render() {
    return (
      <ScrollView style={{  flex:1 }}>
        
        <Text style={[texts.LISTTITLE, {marginTop:14}]}>What is the event going to be at?</Text>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Share your current location.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Type in an address.</Text>
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

