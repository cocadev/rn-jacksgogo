import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import { TestTags, FEEDBACK3 } from '../../common/staticdata';
import JobButton from '../../components/JobButton';
import GoClubFeedbackListItem from '../../components/GoClubFeedbackListItem';
import { images } from '../../common/images';
import {MapView} from 'expo';

export default class GoClubMap extends React.Component {

  render() {
    return (
      <View style={commonStyles.container}>
        <Header title="Edit GoClub" />
        <View style={{ backgroundColor:colors.WHITE, elevation:1, width:'100%', flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../assets/images/social/icon_cat_family.png')} style={{width:26, height:26, marginLeft:20}} />
            <Text style={[texts.CAPTION.LISTTEXT, {marginLeft:20}]}>Family</Text>
        </View>

        <View style={{marginVertical:6, flexDirection:'row',}}>
            <View style={{ paddingHorizontal:6, justifyContent:'center', flex:1}}>
               <Text>Jurong Community Centre</Text>
               <Text>10 Jurong Road 8 #05-33 408600</Text>
            </View>
            <Image source={images.button_location_purple} style={{width:30, height:30, margin:6}} />
            <Image source={images.button_share_purple} style={{width:30, height:30, margin:6}} />
          
        </View>
        <MapView
              style={{ width: '100%', flex: 1 }}
              region={{
                latitude: 1.285079,
                longitude: 103.85280,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    separator: {
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
});
