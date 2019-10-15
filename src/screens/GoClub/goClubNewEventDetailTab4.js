import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';

export default class GoClubNewEventDetailTab4 extends React.Component {

  render() {
    return (
      <ScrollView style={{  flex:1 }}>
        
        <Text style={[texts.LISTTITLE, {marginTop:14}]}>Do you have a limit on number of attendees?</Text>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>No limits.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Limit to...</Text>
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

