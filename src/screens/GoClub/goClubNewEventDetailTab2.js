import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';

export default class GoClubNewEventDetailTab2 extends React.Component {

  render() {
    return (
      <ScrollView style={{  flex:1 }}>
        
        <Text style={[texts.LISTTITLE, {marginTop:14}]}>What kind of event will it be?</Text>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>One-time event.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Repeating event.</Text>
        </TouchableOpacity>

        <Text style={[texts.LISTTITLE, {marginTop:14}]}>When is the event?</Text>

        <View style={[styles.photoButton, {borderColor:colors.GREY2}]}>

          <TouchableOpacity>
            <Text style={[texts.LISTTITLE, {color:colors.GREY3, marginHorizontal:12}]}>Day</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[texts.LISTTITLE, {color:colors.GREY3, marginHorizontal:12}]}>Date</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[texts.LISTTITLE, {color:colors.GREY3, marginHorizontal:12}]}>Time</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Every weekly.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton}>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Every monthly.</Text>
        </TouchableOpacity>

        <View style={{justifyContent:'center', alignItems:'center', marginVertical:12}}>
            <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>Add Another Day</Text>
        </View>
       
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

