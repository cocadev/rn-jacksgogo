import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';
import { Actions } from 'react-native-router-flux';

export default class GoClubCreateDetailTab3 extends React.Component {

  render() {
    return (
      <ScrollView style={{  flex:1 }}>
        
        <Text style={[texts.LISTTITLE, {marginTop:14}]}>You will be the default admin of your GoClub. Do you want to add others?</Text>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>I will be the sale admin.</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>Actions.goclubcreatedetailtab3addothers()} style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Add others...</Text>
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

